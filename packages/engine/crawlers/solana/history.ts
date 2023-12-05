import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type {
	ConfirmedSignatureInfo,
	Connection,
	ParsedAccountData,
	ParsedInstruction,
	ParsedTransactionWithMeta,
	PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Collectible, Token, TokenAccount } from '@walless/core';
import { logger, Networks } from '@walless/core';
import { modules } from '@walless/ioc';

import { historyActions } from './../../state/history/index';
import { getMetadata, solMint } from './metadata';
import type { SolanaContext } from './shared';
import { throttle } from './shared';

const getGasilonFeePayer = async () => {
	const gasilonConfigs = await fetch(`${modules.config.GASILON_ENDPOINT}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const feePayer = (await gasilonConfigs.json()).feePayer;
	return feePayer;
};

const checkIfMetaIsValid = (
	meta: ParsedTransactionWithMeta['meta'],
): boolean => {
	return !(
		!meta?.preTokenBalances ||
		!meta?.postTokenBalances ||
		meta?.postTokenBalances.length === 0 ||
		meta?.preTokenBalances.length === 0
	);
};

export interface Transaction {
	id: string;
	signature: string;
	network: Networks;
	type: 'Sent' | 'Received';
	status: 'Success' | 'Pending' | 'Failed';
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

const isAbstractionFee = (
	meta: ParsedTransactionWithMeta['meta'],
	feePayer: string,
) => {
	const tokenBalances = meta?.postTokenBalances;

	for (const tokenBalance of tokenBalances ?? []) {
		if (tokenBalance.owner === feePayer) {
			return true;
		}
	}

	return false;
};

const getTransactionTokenForFee = async (
	instruction: ParsedInstruction | PartiallyDecodedInstruction,
	meta: ParsedTransactionWithMeta['meta'],
	solanaContext: SolanaContext,
	feePayer: string,
) => {
	const nativeTokenFee = {
		network: Networks.solana,
		account: {
			mint: solMint,
			owner: 'system',
			address: solMint,
			balance: '',
			decimals: 9,
		},
		metadata: await getMetadata(solanaContext, solMint),
	};

	if (isAbstractionFee(meta, feePayer)) {
		const tokenBalances = meta?.postTokenBalances;

		for (const tokenBalance of tokenBalances ?? []) {
			if (!tokenBalance.owner) continue;

			if (tokenBalance.owner === feePayer) {
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

	return nativeTokenFee;
};

const getTransactionFee = (
	transaction: ParsedTransactionWithMeta,
	tokenForFee: Token,
	feePayer: string,
) => {
	let fee = (transaction.meta?.fee ?? 5000) / 10 ** 9;

	if (isAbstractionFee(transaction.meta, feePayer)) {
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
	ownerPublicKey: string,
	solanaContext: SolanaContext,
	feePayer: string,
) => {
	const token: Token = {
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

	if (!checkIfMetaIsValid(meta)) {
		const solMetadata = await getMetadata(solanaContext, solMint);

		token.account.mint = solMint;
		token.account.decimals = 9;
		token.metadata = solMetadata;

		return token;
	}

	const tokenBalances = meta?.postTokenBalances || [];

	for (const tokenBalance of tokenBalances) {
		if (!tokenBalance.owner) continue;

		if (
			tokenBalance.owner !== feePayer &&
			tokenBalance.owner !== ownerPublicKey
		) {
			const account: TokenAccount = {
				mint: tokenBalance.mint,
				owner: tokenBalance.owner,
				address: (instruction as ParsedInstruction).parsed?.info.source,
				balance: tokenBalance.uiTokenAmount.uiAmount?.toString() || '',
				decimals: tokenBalance.uiTokenAmount.decimals,
			};
			const metadata = await getMetadata(solanaContext, tokenBalance.mint);

			token.account = account;
			token.metadata = metadata;

			return token;
		}
	}

	return token;
};

const getTransactionBalances = (
	meta: ParsedTransactionWithMeta['meta'],
	ownerPublicKey: string,
	type?: 'Sent' | 'Received',
) => {
	if (!meta) {
		return {
			preBalance: 0,
			postBalance: 0,
		};
	}
	if (!checkIfMetaIsValid(meta)) {
		if (type === 'Sent') {
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

		const preBalances = (meta?.preTokenBalances || []).filter(
			(item) => item.owner === ownerPublicKey,
		);
		const postBalances = (meta?.postTokenBalances || []).filter(
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

const getTransactionAmount = (
	token: Token,
	tokeForFee: Token,
	instruction: ParsedInstruction | PartiallyDecodedInstruction,
) => {
	const parsedInstructionInfo = (instruction as ParsedInstruction).parsed?.info;

	let amount = 0;

	if (token.account.mint === solMint) {
		amount = parsedInstructionInfo?.lamports / 10 ** 9;
	} else if (parsedInstructionInfo?.amount) {
		amount = parsedInstructionInfo?.amount / 10 ** token.account.decimals;
	} else if (parsedInstructionInfo?.tokenAmount?.amount) {
		amount =
			parseFloat(parsedInstructionInfo?.tokenAmount.amount) /
			10 ** token.account.decimals;
	} else if (token.account.mint === tokeForFee.account.mint) {
		amount = parsedInstructionInfo?.amount / 10 ** token.account.decimals;
	}
	if (token.metadata?.mpl) {
		amount = 1;
	}

	return amount;
};

const getTransactionType = (
	transaction: ParsedTransactionWithMeta,
	ownerPublicKey: string,
) => {
	if (!checkIfMetaIsValid(transaction.meta)) {
		const sender =
			transaction.transaction.message.accountKeys[0].pubkey.toString();

		const type = ownerPublicKey === sender ? 'Sent' : 'Received';

		return type;
	}

	const { preBalance, postBalance } = getTransactionBalances(
		transaction.meta,
		ownerPublicKey,
	);

	const type = postBalance - preBalance < 0 ? 'Sent' : 'Received';

	return type;
};

const getTransactionPartners = async (
	transaction: ParsedTransactionWithMeta,
	instruction: ParsedInstruction | PartiallyDecodedInstruction,
	connection: Connection,
	token: Token,
) => {
	let sender = '';
	let receiver = '';

	const partnerInfo = (instruction as ParsedInstruction).parsed?.info;

	const senderAccount = await connection.getParsedAccountInfo(
		new PublicKey(partnerInfo?.source),
	);

	const receiverAccount = await connection.getParsedAccountInfo(
		new PublicKey(partnerInfo?.destination),
	);

	const senderData = senderAccount?.value?.data as ParsedAccountData;
	const receiverData = receiverAccount?.value?.data as ParsedAccountData;

	sender =
		partnerInfo?.authority?.toString() ||
		senderData?.parsed?.info?.owner?.toString();

	receiver = receiverData.parsed?.info?.owner?.toString() || '';

	if (token.account.mint === solMint) {
		sender = transaction.transaction.message.accountKeys[0].pubkey.toString();
		receiver = transaction.transaction.message.accountKeys[1].pubkey.toString();
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
	const feePayer = await getGasilonFeePayer();
	const instructions = parsedTransaction.transaction.message.instructions;
	const paymentInstruction = instructions[0];
	const mainInstruction = instructions[instructions.length - 1];

	const confirmation = await getConfirmation(
		solanaContext.connection,
		parsedTransaction.transaction.signatures[0],
	);

	const status =
		confirmation === 'finalized' || confirmation === 'confirmed'
			? 'Success'
			: confirmation === 'processed'
			  ? 'Pending'
			  : 'Failed';

	const type = getTransactionType(parsedTransaction, ownerPublicKey);

	const token = await getTransactionToken(
		mainInstruction,
		parsedTransaction.meta,
		ownerPublicKey,
		solanaContext,
		feePayer,
	);

	const { sender, receiver } = await getTransactionPartners(
		parsedTransaction,
		mainInstruction,
		solanaContext.connection,
		token,
	);

	const tokenForFee = await getTransactionTokenForFee(
		paymentInstruction,
		parsedTransaction.meta,
		solanaContext,
		feePayer,
	);

	const fee = getTransactionFee(parsedTransaction, tokenForFee, feePayer);

	const { preBalance, postBalance } = getTransactionBalances(
		parsedTransaction.meta,
		ownerPublicKey,
	);

	const amount = getTransactionAmount(token, tokenForFee, mainInstruction);

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
		commitment: 'confirmed',
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
	accounts.forEach((account) => {
		tokenAccounts.push(account.pubkey.toString());
	});

	let confirmedSignatureInfos: ConfirmedSignatureInfo[] = [];

	for (const tokenAccount of tokenAccounts) {
		const signatureInfos = await connection.getSignaturesForAddress(
			new PublicKey(tokenAccount),
			{ limit: 20 },
		);

		confirmedSignatureInfos = confirmedSignatureInfos.concat(signatureInfos);
	}

	const signatures = confirmedSignatureInfos.map((info) => info.signature);

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

	const promisesArray: Promise<Transaction | undefined>[] = [];

	const filteredTransactions = parsedTransactions
		.sort((transaction1, transaction2) => {
			return transaction2!.blockTime! - transaction1!.blockTime!;
		})
		.slice(0, 40);

	for (const parsedTransaction of filteredTransactions) {
		if (!parsedTransaction || !parsedTransaction.blockTime) continue;

		const transactionDetails = getTransactionDetails(
			solanaContext,
			parsedTransaction,
			ownerPublicKey,
		);

		promisesArray.push(transactionDetails);
	}

	let transactions = await Promise.all(promisesArray);
	transactions = transactions.filter((transaction) => {
		return transaction !== undefined;
	});

	historyActions.setItems(transactions);

	return transactions;
};

export const historyByAddress = async (
	context: SolanaContext,
	pubkey: PublicKey,
): Promise<Array<Transaction>> => {
	const address = pubkey.toString();
	const confirmedSignatures = await throttle(() => {
		return context.connection.getConfirmedSignaturesForAddress2(pubkey, {
			limit: 20,
		});
	})();

	const signatureIds = confirmedSignatures?.map((i) => i.signature) || [];
	const transactions: Transaction[] = [];

	for (const id of signatureIds) {
		await throttle(async () => {
			try {
				const parsed = await context.connection.getParsedTransaction(id, {
					maxSupportedTransactionVersion: 0,
				});

				if (parsed) {
					const detail = await getTransactionDetails(context, parsed, address);

					if (detail) {
						transactions.push(detail);
						historyActions.setItems(transactions);
					}
				}
			} catch (error) {
				logger.error('Error when fetching Solana history:', error);
			}
		})();
	}

	return transactions;
};
