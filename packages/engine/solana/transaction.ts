import {
	getAssociatedTokenAddressSync,
	TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import type {
	ConfirmedSignatureInfo,
	Connection,
	ParsedInstruction,
	ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Collectible, Token, TokenAccount } from '@walless/core';
import { Networks } from '@walless/core';

import { modules } from '../../ioc';
import { historyActions } from '../state/history';

import { getSolanaMetadata } from './metadata';

const FEE_PAYER = '87S1RnHRrhRNMGtZWrdAqbPBj9on7Z2FdFx5LaYdcSCg';
const SOL_MINT_ADDRESS = '11111111111111111111111111111111';

export interface Transaction {
	id: string;
	signature: string;
	network: Networks;
	type: 'sent' | 'received';
	status: 'success' | 'pending' | 'failed';
	sender: string;
	receiver: string;
	token: Token | Omit<Collectible, 'account' | 'collectionId'>;
	fee: number;
	tokenForFee?: Token;
	preBalance?: number;
	postBalance?: number;
	amount: number;
	date: Date;
}

const getConfirmation = async (connection: Connection, signature: string) => {
	const result = await connection.getSignatureStatus(signature, {
		searchTransactionHistory: true,
	});
	return result.value?.confirmationStatus;
};

const isAbstractionFee = (meta: ParsedTransactionWithMeta['meta']) => {
	const tokenBalances = meta?.postTokenBalances;

	for (const tokenBalance of tokenBalances ?? []) {
		if (tokenBalance.owner === FEE_PAYER) {
			return true;
		}
	}

	return false;
};

const getTransactionTokenForFee = async (
	meta: ParsedTransactionWithMeta['meta'],
	connection: Connection,
) => {
	if (!isAbstractionFee(meta)) {
		return;
	}

	const tokenBalances = meta?.postTokenBalances;

	for (const tokenBalance of tokenBalances ?? []) {
		if (tokenBalance.owner === FEE_PAYER) {
			const network = Networks.solana;
			const account: TokenAccount = {
				mint: tokenBalance.mint,
				owner: tokenBalance.owner,
				address: getAssociatedTokenAddressSync(
					new PublicKey(tokenBalance.owner),
					new PublicKey(tokenBalance.mint),
				).toString(),
				balance: tokenBalance.uiTokenAmount.uiAmount?.toString() || '',
				decimals: tokenBalance.uiTokenAmount.decimals,
			};
			const metadata = await getSolanaMetadata({
				storage: modules.storage,
				connection: connection,
				mintAddress: tokenBalance.mint,
			});

			const token: Token = {
				network,
				account,
				metadata,
			};

			return token;
		}
	}
};

const getTransactionFee = (
	transaction: ParsedTransactionWithMeta,
	tokenForFee?: Token,
) => {
	let fee = transaction.meta?.fee;

	if (isAbstractionFee(transaction.meta)) {
		const instruction = transaction.transaction.message.instructions[0];
		const feeLamports = (instruction as ParsedInstruction).parsed?.info.amount;
		const decimals = tokenForFee?.account.decimals ?? 0;

		if (feeLamports) {
			fee = feeLamports / 10 ** decimals;
		}
	}

	return fee;
};

const getTransactionToken = async (
	meta: ParsedTransactionWithMeta['meta'],
	type: 'sent' | 'received',
	sender: string,
	receiver: string,
	connection: Connection,
) => {
	let token: Token = {
		network: Networks.solana,
		account: {
			mint: '',
			owner: '',
			address: '',
			balance: '',
			decimals: 0,
		},
		metadata: {
			name: 'Unknown',
			symbol: '',
			imageUri: '/img/send-token/unknown-token.jpeg',
		},
	};

	if (
		!meta?.preTokenBalances ||
		!meta?.postTokenBalances ||
		meta?.postTokenBalances.length === 0 ||
		meta?.preTokenBalances.length === 0
	) {
		const solMetadata = await getSolanaMetadata({
			storage: modules.storage,
			connection: connection,
			mintAddress: SOL_MINT_ADDRESS,
		});

		token = {
			network: Networks.solana,
			account: {
				mint: SOL_MINT_ADDRESS,
				owner: '',
				address: '',
				balance: '',
				decimals: 9,
			},
			metadata: solMetadata,
		};

		return token;
	}

	const tokenBalances = meta.postTokenBalances;

	for (const tokenBalance of tokenBalances) {
		if (
			tokenBalance.owner !== FEE_PAYER &&
			tokenBalance.owner !== (type === 'sent' ? sender : receiver)
		) {
			const network = Networks.solana;
			const account: TokenAccount = {
				mint: tokenBalance.mint,
				owner: tokenBalance.owner,
				address: getAssociatedTokenAddressSync(
					new PublicKey(tokenBalance?.owner ?? ''),
					new PublicKey(tokenBalance.mint),
				).toString(),
				balance: tokenBalance.uiTokenAmount.uiAmount?.toString() || '',
				decimals: tokenBalance.uiTokenAmount.decimals,
			};
			const metadata = await getSolanaMetadata({
				storage: modules.storage,
				connection: connection,
				mintAddress: tokenBalance.mint,
			});

			token = {
				network,
				account,
				metadata,
			};

			return token;
		}
	}

	return token;
};

const getTransactionBalances = (
	meta: ParsedTransactionWithMeta['meta'],
	ownerPublicKey: string,
) => {
	if (
		!meta?.preTokenBalances ||
		!meta?.postTokenBalances ||
		meta?.postTokenBalances.length === 0 ||
		meta?.preTokenBalances.length === 0
	) {
		return {
			preBalance: 0,
			postBalance: 0,
		};
	} else {
		let preBalance = 0;
		let postBalance = 0;
		const preBalances = meta.preTokenBalances.filter(
			(item) => item.owner === ownerPublicKey,
		);

		const postBalances = meta.postTokenBalances.filter(
			(item) => item.owner === ownerPublicKey,
		);

		if (!preBalances[0]?.uiTokenAmount.uiAmount) {
			preBalance = 0;
		} else {
			preBalance = preBalances[0].uiTokenAmount.uiAmount;
		}

		if (!postBalances[0]?.uiTokenAmount.uiAmount) {
			postBalance = 0;
		} else {
			postBalance = postBalances[0].uiTokenAmount.uiAmount;
		}

		const amount = parseFloat(
			Math.abs(postBalance - preBalance).toPrecision(3),
		);

		return {
			preBalance,
			postBalance,
		};
	}
};

const getTransactionAmount = ({
	preBalance,
	postBalance,
}: {
	preBalance: number;
	postBalance: number;
}) => {
	const amount = parseFloat(Math.abs(postBalance - preBalance).toPrecision(3));

	return amount;
};

const getTransactionType = (
	transaction: ParsedTransactionWithMeta,
	ownerPublicKey: string,
) => {
	if (
		!transaction.meta?.preTokenBalances ||
		!transaction.meta?.postTokenBalances ||
		transaction.meta.postTokenBalances.length === 0 ||
		transaction.meta.preTokenBalances.length === 0
	) {
		const sender =
			transaction.transaction.message.accountKeys[0].pubkey.toString();

		const type = ownerPublicKey === sender ? 'sent' : 'received';

		return type;
	}

	const { preBalance, postBalance } = getTransactionBalances(
		transaction.meta,
		ownerPublicKey,
	);

	const type = postBalance - preBalance < 0 ? 'sent' : 'received';

	return type;
};

const getTransactionPartners = (
	transaction: ParsedTransactionWithMeta,
	ownerPublicKey: string,
	type: 'sent' | 'received',
) => {
	let sender = '';
	let receiver = '';

	if (
		!transaction.meta?.preTokenBalances ||
		!transaction.meta?.postTokenBalances ||
		transaction.meta.postTokenBalances.length === 0 ||
		transaction.meta.preTokenBalances.length === 0
	) {
		const sender =
			transaction.transaction.message.accountKeys[0].pubkey.toString();
		const receiver =
			transaction.transaction.message.accountKeys[1].pubkey.toString();

		return {
			sender,
			receiver,
		};
	}

	const partner = transaction.meta?.postTokenBalances.filter(
		(item) => item.owner !== ownerPublicKey,
	);

	if (type === 'sent') {
		sender = ownerPublicKey;
		receiver = partner[0].owner ?? '';
	} else {
		sender = partner[0].owner ?? '';
		receiver = ownerPublicKey;
	}

	return {
		sender,
		receiver,
	};
};

export const getTransactionDetails = async (
	connection: Connection,
	parsedTransaction: ParsedTransactionWithMeta,
	ownerPublicKey: string,
) => {
	if (!parsedTransaction.meta) return;

	const confirmation = await getConfirmation(
		connection,
		parsedTransaction.transaction.signatures[0],
	);

	const status =
		confirmation === 'finalized' || confirmation === 'confirmed'
			? 'success'
			: confirmation === 'processed'
			? 'pending'
			: 'failed';

	const type = getTransactionType(parsedTransaction, ownerPublicKey);

	const { sender, receiver } = getTransactionPartners(
		parsedTransaction,
		ownerPublicKey,
		type,
	);

	const token = await getTransactionToken(
		parsedTransaction.meta,
		type,
		sender,
		receiver,
		connection,
	);

	const tokenForFee = await getTransactionTokenForFee(
		parsedTransaction.meta,
		connection,
	);

	const fee = getTransactionFee(parsedTransaction, tokenForFee);

	const { preBalance, postBalance } = getTransactionBalances(
		parsedTransaction.meta,
		ownerPublicKey,
	);

	const amount = getTransactionAmount({
		preBalance,
		postBalance,
	});

	const finalTransaction: Transaction = {
		id: parsedTransaction.transaction.signatures[0],
		signature: parsedTransaction.transaction.signatures[0],
		network: Networks.solana,
		type,
		status,
		sender,
		receiver,
		token,
		tokenForFee,
		fee: fee ?? 0,
		preBalance,
		postBalance,
		amount,
		date: parsedTransaction.blockTime
			? new Date(parsedTransaction.blockTime * 1000)
			: new Date(),
	};

	return finalTransaction;
};

export const getSignatureList = async (
	connection: Connection,
	ownerPublicKey: string,
) => {
	const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
		filters: [
			{
				dataSize: 165,
			},
			{
				memcmp: {
					offset: 32,
					bytes: ownerPublicKey,
				},
			},
		],
	});

	const tokenAccounts = [ownerPublicKey];
	accounts.map((account) => {
		tokenAccounts.push(account.pubkey.toString());
	});

	let confirmedSignatureInfos: ConfirmedSignatureInfo[] = [];
	for (let i = 0; i < tokenAccounts.length; i++) {
		const signatureInfos = await connection.getSignaturesForAddress(
			new PublicKey(tokenAccounts[i]),
			{ limit: 30 },
		);
		confirmedSignatureInfos = Array.from(
			new Set(confirmedSignatureInfos.concat(signatureInfos)),
		);
	}

	const signatures = Array.from(
		new Set(confirmedSignatureInfos.map((info) => info.signature)),
	);

	return signatures;
};

export const getTransactions = async (
	connection: Connection,
	signatures: string[],
	ownerPublicKey: string,
) => {
	const parsedTransactions = await connection.getParsedTransactions(
		signatures,
		{ maxSupportedTransactionVersion: 0 },
	);

	const promisesArray = parsedTransactions
		.sort((a, b) => {
			if (!a?.blockTime || !b?.blockTime) return 0;
			return b.blockTime - a.blockTime;
		})
		.slice(0, 20)
		.map(async (transaction) => {
			if (!transaction || !transaction.blockTime) return null;

			const transactionDetails = await getTransactionDetails(
				connection,
				transaction,
				ownerPublicKey,
			);
			if (!transactionDetails) return null;

			return transactionDetails;
		});

	let transactions = await Promise.all(promisesArray);

	transactions = transactions.filter((transaction) => {
		return transaction !== null;
	});
	historyActions.setItems(transactions);

	return transactions;
};
