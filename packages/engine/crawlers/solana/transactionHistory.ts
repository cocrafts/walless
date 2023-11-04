import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type {
	ConfirmedSignatureInfo,
	ParsedInstruction,
	ParsedTransactionWithMeta,
	PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Collectible, Token, TokenAccount } from '@walless/core';
import { Networks } from '@walless/core';

import { historyActions } from './../../state/history/index';
import { getMetadata } from './metadata';
import type { SolanaContext } from './shared';

const gasilonConfigs = await fetch(`${GASILON_ENDPOINT}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
});

const FEE_PAYER = (await gasilonConfigs.json()).feePayer;
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

const getConfirmation = async (
	solanaContext: SolanaContext,
	signature: string,
) => {
	const result = await solanaContext.connection.getSignatureStatus(signature, {
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
	instruction: ParsedInstruction | PartiallyDecodedInstruction,
	meta: ParsedTransactionWithMeta['meta'],
	solanaContext: SolanaContext,
) => {
	if (isAbstractionFee(meta)) {
		const tokenBalances = meta?.postTokenBalances;

		for (const tokenBalance of tokenBalances ?? []) {
			if (!tokenBalance.owner) continue;

			if (tokenBalance.owner === FEE_PAYER) {
				const network = Networks.solana;
				const account: TokenAccount = {
					mint: tokenBalance.mint,
					owner: tokenBalance.owner,
					address: (instruction as ParsedInstruction).parsed?.info.source,
					balance: tokenBalance.uiTokenAmount.uiAmount?.toString() || '',
					decimals: tokenBalance.uiTokenAmount.decimals,
				};
				const metadata = await getMetadata(solanaContext, tokenBalance.mint);

				const token: Token = {
					network,
					account,
					metadata,
				};

				return token;
			}
		}
	}

	return {
		network: Networks.solana,
		account: {
			mint: SOL_MINT_ADDRESS,
			owner: 'system',
			address: SOL_MINT_ADDRESS,
			balance: '',
			decimals: 9,
		},
		metadata: await getMetadata(solanaContext, SOL_MINT_ADDRESS),
	};
};

const getTransactionFee = (
	transaction: ParsedTransactionWithMeta,
	tokenForFee: Token,
) => {
	let fee = (transaction.meta?.fee ?? 5000) / 10 ** 9;

	if (isAbstractionFee(transaction.meta)) {
		const instruction = transaction.transaction.message.instructions[0];
		const feeLamports = (instruction as ParsedInstruction).parsed?.info.amount;
		const decimals = tokenForFee.account.decimals;

		if (feeLamports) {
			fee = feeLamports / 10 ** decimals;
		}
	}

	return fee;
};

const getTransactionToken = async (
	instruction: ParsedInstruction | PartiallyDecodedInstruction,
	meta: ParsedTransactionWithMeta['meta'],
	type: 'sent' | 'received',
	sender: string,
	receiver: string,
	solanaContext: SolanaContext,
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
		const solMetadata = await getMetadata(solanaContext, SOL_MINT_ADDRESS);

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
		if (!tokenBalance.owner) continue;

		if (
			tokenBalance.owner !== FEE_PAYER &&
			tokenBalance.owner !== (type === 'sent' ? sender : receiver)
		) {
			const network = Networks.solana;
			const account: TokenAccount = {
				mint: tokenBalance.mint,
				owner: tokenBalance.owner,
				address: (instruction as ParsedInstruction).parsed?.info.source,
				balance: tokenBalance.uiTokenAmount.uiAmount?.toString() || '',
				decimals: tokenBalance.uiTokenAmount.decimals,
			};
			const metadata = await getMetadata(solanaContext, tokenBalance.mint);

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
	type?: 'sent' | 'received',
) => {
	if (!meta) {
		return {
			preBalance: 0,
			postBalance: 0,
		};
	}
	if (
		!meta.preTokenBalances ||
		!meta.postTokenBalances ||
		meta.postTokenBalances.length === 0 ||
		meta.preTokenBalances.length === 0
	) {
		if (type === 'sent') {
			const preBalance = meta.preBalances[0] / 10 ** 9;
			const postBalance = meta.postBalances[0] / 10 ** 9;

			return {
				preBalance,
				postBalance,
			};
		}
		return {
			preBalance: meta.preBalances[1] / 10 ** 9,
			postBalance: meta.postBalances[1] / 10 ** 9,
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
	solanaContext: SolanaContext,
	parsedTransaction: ParsedTransactionWithMeta,
	ownerPublicKey: string,
) => {
	if (!parsedTransaction.meta) return;

	const instructions = parsedTransaction.transaction.message.instructions;
	const paymentInstruction = instructions[0];
	const mainInstruction = instructions[instructions.length - 1];

	const confirmation = await getConfirmation(
		solanaContext,
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
		mainInstruction,
		parsedTransaction.meta,
		type,
		sender,
		receiver,
		solanaContext,
	);

	const tokenForFee = await getTransactionTokenForFee(
		paymentInstruction,
		parsedTransaction.meta,
		solanaContext,
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
	solanaContext: SolanaContext,
	ownerPublicKey: string,
) => {
	const accounts = await solanaContext.connection.getParsedProgramAccounts(
		TOKEN_PROGRAM_ID,
		{
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
		},
	);

	const tokenAccounts = [ownerPublicKey];
	accounts.map((account) => {
		tokenAccounts.push(account.pubkey.toString());
	});

	let confirmedSignatureInfos: ConfirmedSignatureInfo[] = [];
	for (let i = 0; i < tokenAccounts.length; i++) {
		const signatureInfos =
			await solanaContext.connection.getSignaturesForAddress(
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
	solanaContext: SolanaContext,
	signatures: string[],
	ownerPublicKey: string,
) => {
	const parsedTransactions =
		await solanaContext.connection.getParsedTransactions(signatures, {
			maxSupportedTransactionVersion: 0,
		});

	console.log(parsedTransactions);
	const promisesArray = parsedTransactions
		.sort((a, b) => {
			if (!a?.blockTime || !b?.blockTime) return 0;
			return b.blockTime - a.blockTime;
		})
		.slice(0, 20)
		.map(async (transaction) => {
			if (!transaction || !transaction.blockTime) return null;

			const transactionDetails = await getTransactionDetails(
				solanaContext,
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