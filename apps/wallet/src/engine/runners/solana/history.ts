import type {
	Connection,
	ParsedInstruction,
	ParsedTransaction,
	ParsedTransactionMeta,
	ParsedTransactionWithMeta,
	PublicKey,
	TokenBalance,
} from '@solana/web3.js';
import type { TransactionHistory } from '@walless/core';
import { Networks } from '@walless/core';
import { solana } from '@walless/network';
import type { TokenDocument, TransactionHistoryDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { storage } from 'utils/storage';

import { getMetadata } from './metadata';
import type { ParsedTokenAccountWithAddress } from './types';

const historyLimit = 20;

export const getTransactionsHistory = async (
	connection: Connection,
	wallet: PublicKey,
	accounts: ParsedTokenAccountWithAddress[],
) => {
	const splTokenAccount = accounts
		.filter((account) => account.tokenAmount.decimals > 0)
		.map((account) => account.publicKey);

	const accountList = [wallet].concat(splTokenAccount);
	const signatureList = [
		...new Set(await getTransactionSignatures(connection, accountList)),
	];
	const transactions = (
		await getTransactionsDetail(connection, signatureList)
	).slice(0, 20);
	const transactionHistoryDocuments: TransactionHistoryDocument[] = (
		await Promise.all(
			transactions
				.filter((transaction) => transaction !== null)
				.map((transaction) =>
					constructTransactionHistoryDocument(
						connection,
						transaction as ParsedTransactionWithMeta,
						wallet,
					),
				),
		)
	).filter((doc) => doc !== null);

	removeOldHistories(transactionHistoryDocuments);

	transactionHistoryDocuments.forEach((historyDoc) => {
		storage.upsert<TransactionHistoryDocument>(historyDoc._id, async () => {
			return historyDoc;
		});
	});
};

const getTransactionSignatures = async (
	connection: Connection,
	accountList: PublicKey[],
) => {
	const signatureBufferList = await Promise.all(
		accountList.map(async (account) => {
			const transactionList = await connection.getSignaturesForAddress(
				account,
				{
					limit: historyLimit,
				},
			);

			return transactionList.map((trans) => trans.signature);
		}),
	);

	const signatureList = signatureBufferList.reduce((signatureList, subList) => {
		return signatureList.concat(subList);
	}, []);

	return signatureList;
};

const getTransactionsDetail = async (
	connection: Connection,
	signatureList: string[],
) => {
	const parsedTransactions = await connection.getParsedTransactions(
		signatureList,
		{
			maxSupportedTransactionVersion: 0,
			commitment: 'finalized',
		},
	);
	const sortedTransactions = parsedTransactions.sort((trans1, trans2) =>
		(trans1?.blockTime || 0) < (trans2?.blockTime || 0) ? 1 : -1,
	);

	return sortedTransactions;
};

const constructTransactionHistoryDocument = async (
	connection: Connection,
	parsedTransaction: ParsedTransactionWithMeta,
	wallet: PublicKey,
): Promise<TransactionHistoryDocument> => {
	const { meta, transaction, blockTime } = parsedTransaction;
	const walletAddress = wallet.toString();

	const _id = `${walletAddress}/history/${transaction.signatures[0]}`;
	const signature = transaction.signatures[0];
	const id = signature;
	const transactionType = getTransactionType(
		transaction.message.accountKeys[0].pubkey,
		walletAddress,
	);
	const { sender, receiver, amount, token } =
		(await getTransactionBalances(connection, parsedTransaction)) || {};

	const tokenForFee = await getTransactionFee(walletAddress);
	const fee = (meta?.fee || 0) / 10 ** (tokenForFee?.account.decimals || 9);
	const date = blockTime ? new Date(blockTime * 1000) : new Date();

	return {
		_id,
		type: 'History',
		id,
		signature,
		network: Networks.solana,
		transactionType,
		status: 'Success',
		sender,
		receiver,
		amount,
		token,
		tokenForFee,
		fee,
		date,
	} as TransactionHistoryDocument;
};

const getTransactionType = (sender: PublicKey, walletAddress: string) => {
	return sender.toString() === walletAddress ? 'Sent' : 'Received';
};

const getTransactionBalances = async (
	connection: Connection,
	parsedTransaction: ParsedTransactionWithMeta,
) => {
	const { meta, transaction } = parsedTransaction;
	if (!meta) return;
	if (!meta.preTokenBalances || !meta.postTokenBalances) return;

	const isSplTokenTransaction =
		meta.preTokenBalances?.length > 0 || meta.postTokenBalances?.length > 0;

	if (isSplTokenTransaction) {
		return await getSplTransactionBalances(connection, meta);
	}
	return await getNativeTransactionBalances(transaction);
};

const getNativeTransactionBalances = async (transaction: ParsedTransaction) => {
	// const _id = `${walletAddress}/token/${solana.solMint}`;
	const token: TransactionHistory['token'] = {
		network: Networks.solana,
		metadata: solana.solMetadata,
	};
	const parsedInstruction = transaction.message.instructions.find(
		(instruction) =>
			'parsed' in instruction && instruction.parsed !== 'undefined',
	) as ParsedInstruction;

	const sender = (parsedInstruction?.parsed?.info?.source as string) || '';
	const receiver =
		(parsedInstruction?.parsed?.info?.destination as string) || '';
	const amount =
		((parsedInstruction?.parsed?.info?.lamports as number) || 0) / 10 ** 9;

	return {
		sender,
		receiver,
		amount,
		token,
	};
};

const getSplTransactionBalances = async (
	connection: Connection,
	meta: ParsedTransactionMeta,
) => {
	if (!meta.preTokenBalances || !meta.postTokenBalances) return;
	if (meta.preTokenBalances.length === 0 || meta.postTokenBalances.length === 0)
		return;

	const { mint, sender, receiver, amount } = analyzeTokenBalances(
		meta.preTokenBalances,
		meta.postTokenBalances,
	);

	const token: TransactionHistory['token'] = {
		network: Networks.solana,
		metadata: await getMetadata(connection, mint),
	};

	return {
		sender,
		receiver,
		amount: Math.abs(amount),
		token,
	};
};

const analyzeTokenBalances = (
	preTokenBalances: TokenBalance[],
	postTokenBalances: TokenBalance[],
) => {
	if (postTokenBalances.length > preTokenBalances.length) {
		const referralPreBalance = preTokenBalances[0];
		const correspondingPostBalance = postTokenBalances.find(
			(balance) => balance.accountIndex === referralPreBalance.accountIndex,
		);
		const otherPostBalance = postTokenBalances.find(
			(balance) => balance.accountIndex !== referralPreBalance.accountIndex,
		);
		const mint = referralPreBalance.mint;
		const amount =
			(correspondingPostBalance?.uiTokenAmount.uiAmount || 0) -
			(referralPreBalance?.uiTokenAmount.uiAmount || 0);

		let sender: string;
		let receiver: string;
		if (amount < 0) {
			sender = correspondingPostBalance?.owner || '';
			receiver = otherPostBalance?.owner || '';
		} else {
			sender = otherPostBalance?.owner || '';
			receiver = correspondingPostBalance?.owner || '';
		}

		return {
			mint,
			amount,
			sender,
			receiver,
		};
	}

	const referralPostBalance = postTokenBalances[0];
	const correspondingPreBalance = preTokenBalances.find(
		(balance) => balance.accountIndex === referralPostBalance.accountIndex,
	);
	const otherPreBalance = preTokenBalances.find(
		(balance) => balance.accountIndex !== referralPostBalance.accountIndex,
	);
	const mint = referralPostBalance.mint;
	const amount =
		(referralPostBalance.uiTokenAmount.uiAmount || 0) -
		(correspondingPreBalance?.uiTokenAmount.uiAmount || 0);

	let sender: string;
	let receiver: string;
	if (amount < 0) {
		sender = correspondingPreBalance?.owner || '';
		receiver = otherPreBalance?.owner || '';
	} else {
		sender = otherPreBalance?.owner || '';
		receiver = correspondingPreBalance?.owner || '';
	}

	return {
		mint,
		amount,
		sender,
		receiver,
	};
};

const getTransactionFee = async (walletAddress: string) => {
	return await storage.safeGet<TokenDocument>(
		`${walletAddress}/token/${solana.solMint}`,
	);
};

const removeOldHistories = async (
	newHistoryDocs: TransactionHistoryDocument[],
) => {
	const { docs } = await storage.find(selectors.allHistories);

	if (docs.length === 0) return;

	const oldHistoryDocs = (docs as TransactionHistoryDocument[]).sort(
		(doc1, doc2) => (doc1.date > doc2.date ? -1 : 1),
	);

	for (let i = 0; i < 20; i++) {
		if (newHistoryDocs.length === 0 && oldHistoryDocs.length === 0) return;

		const currentNewDoc = newHistoryDocs[0];
		const currentOldDoc = oldHistoryDocs[0];

		if (currentNewDoc) {
			if (currentNewDoc._id === currentOldDoc._id) {
				oldHistoryDocs.shift();
			}
			newHistoryDocs.shift();
		} else {
			oldHistoryDocs.shift();
		}
	}

	Promise.all(
		oldHistoryDocs.map(async (doc) => {
			await storage.removeDoc(doc._id);
		}),
	);
};
