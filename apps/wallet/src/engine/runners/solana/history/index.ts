import type {
	Connection,
	ParsedInstruction,
	ParsedTransaction,
	ParsedTransactionMeta,
	ParsedTransactionWithMeta,
	TokenBalance,
} from '@solana/web3.js';
import type { PublicKey } from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import type {
	SolanaSwapHistory,
	SolanaSwapHistoryV1,
	SolanaToken,
	SolanaTransferHistory,
	SolanaTransferHistoryV1,
	SolanaUnknownHistory,
	SolanaUnknownHistoryV1,
} from '@walless/core';
import { logger, Networks } from '@walless/core';
import type { HistoryDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { solMint, wrappedSolMint } from 'utils/constants';
import { storage } from 'utils/storage';

import { throttle } from '../internal';
import { getTokenMetadata, solMetadata } from '../metadata';
import type {
	AccountBalanceMap,
	ParsedTokenAccountWithAddress,
	TransactionBalances,
} from '../types';

import { extractSwapBalance, JUPITER_V6_PROGRAM_ID } from './swapHistory';

const historyLimit = 20;

export const queryTransactionsHistory = async (
	connection: Connection,
	cluster: string,
	wallet: PublicKey,
	accounts: ParsedTokenAccountWithAddress[],
) => {
	const tokenAccounts = accounts
		.filter((account) => account.tokenAmount.decimals > 0)
		.map((account) => account.publicKey);

	tokenAccounts.unshift(wallet);

	const signatures = await getTransactionSignatures(connection, tokenAccounts);
	signatures.splice(historyLimit, signatures.length - historyLimit);

	const txPromises = signatures.map(async (s) => {
		return throttle(async () => {
			// don't use getParsedTransactions because
			// it uses batch rpc request failed by rpc limit without retrying
			// we need to use getParsedTransaction for separately retry
			const tx = await connection
				.getParsedTransaction(s, {
					maxSupportedTransactionVersion: 0,
					commitment: 'finalized',
				})
				.catch(() => {
					logger.error('Unable to get transaction');
				});

			if (!tx) return;

			const txDoc = await constructTransactionHistoryDocument(
				connection,
				cluster,
				tx,
				wallet,
			);

			if (!txDoc) return;
			await storage.upsert<HistoryDocument>(txDoc._id, async () => {
				return txDoc;
			});
		})();
	});

	await Promise.all(txPromises);

	removeOldHistories();
};

const getTransactionSignatures = async (
	connection: Connection,
	accounts: PublicKey[],
) => {
	const signatures = (
		await Promise.all(
			accounts.map(async (account) => {
				const sigs = await throttle(() => {
					return connection.getSignaturesForAddress(account, {
						limit: historyLimit,
					});
				})();

				return sigs;
			}),
		)
	)
		.flat()
		.sort((sig1, sig2) =>
			(sig1?.blockTime || 0) < (sig2?.blockTime || 0) ? 1 : -1,
		)
		.map((s) => s.signature);

	return [...new Set(signatures)];
};

const constructTransactionHistoryDocument = async (
	connection: Connection,
	cluster: string,
	parsedTransaction: ParsedTransactionWithMeta,
	wallet: PublicKey,
): Promise<
	HistoryDocument<
		SolanaTransferHistory | SolanaSwapHistory | SolanaUnknownHistory
	>
> => {
	const { meta, transaction, blockTime } = parsedTransaction;
	const walletAddress = wallet.toString();

	const _id = `${walletAddress}/history/${transaction.signatures[0]}`;
	const signature = transaction.signatures[0];
	const date = blockTime ? new Date(blockTime * 1000) : new Date();
	const status = !meta?.err ? 'Success' : 'Failed';
	const tokenForFee = getTransactionTokenFee();
	const fee = (meta?.fee || 0) / LAMPORTS_PER_SOL;
	const balances = await getTransactionBalances(
		connection,
		parsedTransaction,
		walletAddress,
	);

	if (!tokenForFee || balances.transactionType === 'Unknown') {
		return {
			_id,
			type: 'History',
			cluster,
			signature,
			network: Networks.solana,
			transactionType: 'Unknown',
			status,
			date,
		};
	}

	return {
		_id,
		type: 'History',
		cluster,
		signature,
		network: Networks.solana,
		tokenForFee,
		fee,
		date,
		status,
		...balances,
	};
};

const getTransferTxType = (
	walletAddress: string,
	sender?: string,
): 'Sent' | 'Received' => {
	return sender === walletAddress ? 'Sent' : 'Received';
};

const getTransactionBalances = async (
	connection: Connection,
	parsedTransaction: ParsedTransactionWithMeta,
	ownerAddress: string,
): Promise<TransactionBalances> => {
	const { meta, transaction } = parsedTransaction;

	if (!meta || !meta?.preTokenBalances || !meta?.postTokenBalances)
		return { transactionType: 'Unknown' };

	const isJupiterSwap = meta?.logMessages?.find((message) =>
		message.includes(JUPITER_V6_PROGRAM_ID),
	);

	if (isJupiterSwap) {
		return await parseSwapTransaction({ transaction, meta, ownerAddress });
	}

	const isSplTokenTransaction =
		meta.preTokenBalances?.length > 0 || meta.postTokenBalances?.length > 0;

	if (isSplTokenTransaction) {
		return await getSplTransactionBalances(
			connection,
			meta.preTokenBalances,
			meta.postTokenBalances,
			ownerAddress,
		);
	} else {
		return await getNativeTransactionBalances(transaction, ownerAddress);
	}
};

const parseSwapTransaction = async ({
	transaction,
	meta,
	ownerAddress,
}: {
	transaction: ParsedTransaction;
	meta: ParsedTransactionMeta;
	ownerAddress: string;
}): Promise<SolanaSwapHistoryV1 | SolanaUnknownHistoryV1> => {
	const {
		receivedTokenMint,
		receivedTokenAmount,
		sentTokenMint,
		sentTokenAmount,
	} = extractSwapBalance(transaction, meta);

	if (!receivedTokenMint || !sentTokenMint)
		return { transactionType: 'Unknown' };

	const isWrappedSol = receivedTokenMint === wrappedSolMint;

	const receivedTokenId = `${ownerAddress}/token/${
		isWrappedSol ? solMint : receivedTokenMint
	}`;
	const sentTokenId = `${ownerAddress}/token/${sentTokenMint}`;

	const [receivedTokenDoc, sentTokenDoc] = await Promise.all([
		storage.safeGet<TokenDocument<SolanaToken>>(receivedTokenId),
		storage.safeGet<TokenDocument<SolanaToken>>(sentTokenId),
	]);

	const receivedToken = {
		amount: receivedTokenAmount / 10 ** (receivedTokenDoc?.decimals || 9),
		metadata: {
			mint: receivedTokenMint,
			name: receivedTokenDoc?.name || 'Unknown',
			symbol: receivedTokenDoc?.symbol || 'Unknown',
			image: receivedTokenDoc?.image || 'Unknown',
		},
	};

	const sentToken = {
		amount: sentTokenAmount / 10 ** (sentTokenDoc?.decimals || 9),
		metadata: {
			mint: sentTokenMint,
			name: sentTokenDoc?.name || 'Unknown',
			symbol: sentTokenDoc?.symbol || 'Unknown',
			image: sentTokenDoc?.image || 'Unknown',
		},
	};

	return {
		transactionType: 'Swap',
		receivedToken,
		sentToken,
	};
};

const getNativeTransactionBalances = async (
	transaction: ParsedTransaction,
	ownerAddress: string,
): Promise<TransactionBalances> => {
	const bubblegumProgram = 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY';
	const programId = transaction.message.instructions[0].programId.toString();

	if (programId === bubblegumProgram) {
		return {
			transactionType: 'Unknown',
		};
	}

	const token: SolanaTransferHistoryV1['token'] = {
		mint: solMint,
		name: solMetadata.name,
		symbol: solMetadata.symbol,
		image: solMetadata.image,
	};
	const parsedInstruction = transaction.message.instructions.find(
		(instruction) =>
			'parsed' in instruction && instruction.parsed !== 'undefined',
	) as ParsedInstruction;
	const amount =
		((parsedInstruction?.parsed?.info?.lamports as number) || 0) /
		LAMPORTS_PER_SOL;

	if (!amount) {
		return {
			transactionType: 'Unknown',
		};
	}

	const sender =
		(parsedInstruction?.parsed?.info?.source as string) || 'Unknown';
	const receiver =
		(parsedInstruction?.parsed?.info?.destination as string) || 'Unknown';
	const transactionType = getTransferTxType(ownerAddress, sender);

	return {
		sender,
		receiver,
		amount,
		token,
		transactionType,
	};
};

const getSplTransactionBalances = async (
	connection: Connection,
	preTokenBalances: TokenBalance[],
	postTokenBalances: TokenBalance[],
	ownerAddress: string,
): Promise<SolanaTransferHistoryV1 | SolanaSwapHistoryV1> => {
	const tokenBalanceMap = mappingTokenBalance(
		preTokenBalances,
		postTokenBalances,
	);
	const txRelatedToOwner = Object.keys(tokenBalanceMap).filter(
		(mint) => tokenBalanceMap[mint][ownerAddress],
	);

	return await parseSplTransferTransaction({
		connection,
		txRelatedToOwner,
		tokenBalanceMap,
		ownerAddress,
	});
};

const mappingTokenBalance = (
	preTokenBalances: TokenBalance[],
	postTokenBalances: TokenBalance[],
): Record<string, AccountBalanceMap> => {
	const tokenBalanceMap: Record<string, AccountBalanceMap> = {};
	postTokenBalances.forEach((balance) => {
		if (balance.owner) {
			const tokenBalance = tokenBalanceMap[balance.mint];
			tokenBalanceMap[balance.mint] = {
				...tokenBalance,
				[balance.owner]: {
					postBalance: balance.uiTokenAmount,
				},
			};
		}
	});

	preTokenBalances.forEach((balance) => {
		if (balance.owner) {
			const tokenBalance = tokenBalanceMap[balance.mint];
			tokenBalanceMap[balance.mint] = {
				...tokenBalance,
				[balance.owner]: {
					...tokenBalance[balance.owner],
					preBalance: balance.uiTokenAmount,
				},
			};
		}
	});

	return tokenBalanceMap;
};

const parseSplTransferTransaction = async ({
	connection,
	txRelatedToOwner,
	tokenBalanceMap,
	ownerAddress,
}: {
	connection: Connection;
	txRelatedToOwner: string[];
	tokenBalanceMap: Record<string, AccountBalanceMap>;
	ownerAddress: string;
}): Promise<SolanaTransferHistoryV1> => {
	const [mint] = txRelatedToOwner;
	const tokenMetadata = await getTokenMetadata(connection, mint);

	const token: SolanaTransferHistory['token'] = {
		mint,
		name: tokenMetadata?.name,
		symbol: tokenMetadata?.symbol,
		image: tokenMetadata?.image,
	};

	const amount =
		(tokenBalanceMap[mint][ownerAddress].postBalance?.uiAmount || 0) -
		(tokenBalanceMap[mint][ownerAddress].preBalance?.uiAmount || 0);
	const [otherOwner] = Object.keys(tokenBalanceMap[mint]).filter(
		(owner) => owner !== ownerAddress,
	);

	let sender = '';
	let receiver = '';

	if (amount > 0) {
		sender = otherOwner;
		receiver = ownerAddress;
	} else {
		sender = ownerAddress;
		receiver = otherOwner;
	}
	const transactionType = getTransferTxType(ownerAddress, sender);

	return {
		sender,
		receiver,
		token,
		amount: Math.abs(amount),
		transactionType,
	};
};

const getTransactionTokenFee = () => {
	return {
		mint: solMint,
		name: solMetadata.name,
		symbol: solMetadata.symbol,
		image: solMetadata.image,
	};
};

const removeOldHistories = async () => {
	const { docs } = await storage.find(selectors.allHistories);

	if (docs.length === 0) return;

	const historyDocs = (docs as HistoryDocument[]).sort((doc1, doc2) =>
		doc1.date > doc2.date ? -1 : 1,
	);

	const historyDocsToRemove = historyDocs.slice(historyLimit);

	historyDocsToRemove.forEach((doc) => {
		storage.removeDoc(doc._id);
	});
};
