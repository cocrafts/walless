import type {
	Connection,
	ParsedInstruction,
	ParsedTransaction,
	ParsedTransactionMeta,
	ParsedTransactionWithMeta,
	PublicKey,
	TokenBalance,
} from '@solana/web3.js';
import type { NetworkCluster, TransactionHistory } from '@walless/core';
import { Networks } from '@walless/core';
import { solana } from '@walless/network';
import type { TokenDocument, TransactionHistoryDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { storage } from 'utils/storage';

import { throttle } from './internal';
import { getMetadata } from './metadata';
import type { ParsedTokenAccountWithAddress } from './types';

const historyLimit = 20;

export const getTransactionsHistory = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
	accounts: ParsedTokenAccountWithAddress[],
) => {
	const tokenAccounts = accounts
		.filter((account) => account.tokenAmount.decimals > 0)
		.map((account) => account.publicKey);

	tokenAccounts.unshift(wallet);

	const signatureList = [
		...new Set(await getTransactionSignatures(connection, tokenAccounts)),
	];

	const transactions = (
		await connection.getParsedTransactions(signatureList, {
			maxSupportedTransactionVersion: 0,
			commitment: 'finalized',
		})
	)
		.sort((trans1, trans2) =>
			(trans1?.blockTime || 0) < (trans2?.blockTime || 0) ? 1 : -1,
		)
		.slice(0, historyLimit);

	const transactionHistoryDocuments: TransactionHistoryDocument[] = (
		await Promise.all(
			transactions
				.filter((transaction) => transaction !== null)
				.map((transaction) =>
					constructTransactionHistoryDocument(
						connection,
						cluster,
						transaction as ParsedTransactionWithMeta,
						wallet,
					),
				),
		)
	).filter((doc) => doc !== null);

	transactionHistoryDocuments.forEach((historyDoc) => {
		storage.upsert<TransactionHistoryDocument>(historyDoc._id, async () => {
			return historyDoc;
		});
	});

	removeOldHistories();
};

const getTransactionSignatures = async (
	connection: Connection,
	accountList: PublicKey[],
) => {
	const signatureList = (
		await Promise.all(
			accountList.map(async (account) => {
				const transactionList = await throttle(() => {
					return connection.getSignaturesForAddress(account, {
						limit: historyLimit,
					});
				})();

				return transactionList.map((trans) => trans.signature);
			}),
		)
	).flat();

	return signatureList;
};

const constructTransactionHistoryDocument = async (
	connection: Connection,
	cluster: NetworkCluster,
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
		(await getTransactionBalances(connection, cluster, parsedTransaction)) ||
		{};

	const tokenForFee = await getTransactionTokenFee(walletAddress);
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
	cluster: NetworkCluster,
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
	return await getNativeTransactionBalances(transaction, cluster);
};

const getNativeTransactionBalances = async (
	transaction: ParsedTransaction,
	cluster: NetworkCluster,
) => {
	const token: TransactionHistory['token'] = {
		cluster,
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
		cluster: '',
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
		const referencedPreBalance = preTokenBalances[0];
		const correspondingPostBalance = postTokenBalances.find(
			(balance) => balance.accountIndex === referencedPreBalance.accountIndex,
		);
		const otherPostBalance = postTokenBalances.find(
			(balance) => balance.accountIndex !== referencedPreBalance.accountIndex,
		);
		const mint = referencedPreBalance.mint;
		const amount =
			(correspondingPostBalance?.uiTokenAmount.uiAmount || 0) -
			(referencedPreBalance?.uiTokenAmount.uiAmount || 0);

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

	const referencedPostBalance = postTokenBalances[0];
	const correspondingPreBalance = preTokenBalances.find(
		(balance) => balance.accountIndex === referencedPostBalance.accountIndex,
	);
	const otherPreBalance = preTokenBalances.find(
		(balance) => balance.accountIndex !== referencedPostBalance.accountIndex,
	);
	const mint = referencedPostBalance.mint;
	const amount =
		(referencedPostBalance.uiTokenAmount.uiAmount || 0) -
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

const getTransactionTokenFee = async (walletAddress: string) => {
	return await storage.safeGet<TokenDocument>(
		`${walletAddress}/token/${solana.solMint}`,
	);
};

const removeOldHistories = async () => {
	const { docs } = await storage.find(selectors.allHistories);

	if (docs.length === 0) return;

	const historyDocs = (docs as TransactionHistoryDocument[]).sort(
		(doc1, doc2) => (doc1.date > doc2.date ? -1 : 1),
	);

	const historyDocsToRemove = historyDocs.slice(historyLimit);

	historyDocsToRemove.forEach((doc) => {
		storage.removeDoc(doc._id);
	});
};
