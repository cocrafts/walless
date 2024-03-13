import type { NftWithToken, SftWithToken } from '@metaplex-foundation/js';
import { Metaplex } from '@metaplex-foundation/js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import type {
	AccountInfo,
	Connection,
	Finality,
	Logs,
	ParsedAccountData,
} from '@solana/web3.js';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import type { NetworkCluster, SolanaToken } from '@walless/core';
import { logger } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import { getTokenQuotes, makeHashId } from 'utils/api';
import { solMint } from 'utils/constants';
import {
	addTokenToStorage,
	getNftByIdFromStorage,
	getTokenByIdFromStorage,
	storage,
	updateNftAmountToStorage,
} from 'utils/storage';

import {
	constructCollectibleDocument,
	updateCollectibleToStorage,
} from './collectibles';
import { throttle } from './internal';
import { initTokenDocumentWithMetadata } from './tokens';
import type { ParsedTokenAccountWithAddress } from './types';

/**
 * All cases we need to subscribe
 * - Send, receive native token
 * - Send SPL token, NFT to wallet which has ATA for this token
 * - Send SPL token, NFT to wallet which does not have ATA for this token
 * - Receive SPL token, NFT which we have ATA for
 * - Receive SPL token, NFT which we don't have ATA for
 * */

const accountChangeIds: number[] = [];

export const watchAccount = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
	tokenAccountAddress: PublicKey,
	commitment: Finality = 'confirmed',
) => {
	const id = connection.onAccountChange(
		tokenAccountAddress,
		async (info) => {
			const isNativeToken = info.data.byteLength === 0;
			if (isNativeToken) {
				try {
					await handleNativeTokenChange(wallet, info);
				} catch (error) {
					logger.error('Failed to handle native token change', error);
				}
			} else {
				try {
					await handleSPLTokenChange(
						connection,
						cluster,
						wallet,
						tokenAccountAddress,
						commitment,
					);
				} catch (error) {
					logger.error('Failed to handle spl token change', error);
				}
			}
		},
		commitment,
	);

	accountChangeIds.push(id);
};

const handleNativeTokenChange = async (
	wallet: PublicKey,
	info: AccountInfo<Buffer>,
) => {
	const newAmount = info.lamports;
	const newBalance = newAmount / LAMPORTS_PER_SOL;
	const id = `${wallet.toString()}/token/${solMint}`;
	await updateTokenBalanceToStorage(id, newBalance, newAmount.toString());
};

const handleSPLTokenChange = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
	tokenAccountAddress: PublicKey,
	commitment: Finality,
) => {
	const accountData = (
		await connection.getParsedAccountInfo(tokenAccountAddress, commitment)
	).value?.data as ParsedAccountData;

	const tokenAccount: ParsedTokenAccountWithAddress = {
		publicKey: wallet,
		...accountData.parsed.info,
	};

	if (tokenAccount.owner !== wallet.toString()) {
		logger.warn(
			`invalid token account ${tokenAccount} with wrong owner ${wallet}`,
		);
		return;
	}

	const isToken = tokenAccount.tokenAmount.decimals !== 0;
	if (isToken) {
		const id = `${wallet.toString()}/token/${tokenAccount.mint}`;
		const storedToken = await getTokenByIdFromStorage(id);
		if (storedToken) {
			const amount = tokenAccount.tokenAmount.amount;
			const balance =
				tokenAccount.tokenAmount.uiAmount ||
				Number(amount) / 10 ** tokenAccount.tokenAmount.decimals;

			await updateTokenBalanceToStorage(id, balance, amount);
		} else {
			const tokenDocument = await initTokenDocumentWithMetadata(
				connection,
				cluster,
				tokenAccount,
			);
			await addTokenToStorage(tokenDocument);
		}
	} else {
		const id = `${wallet.toString()}/collectible/${tokenAccount.mint}`;
		const storedCollectible = await getNftByIdFromStorage(id);
		if (storedCollectible) {
			await updateNftAmountToStorage(
				id,
				parseInt(tokenAccount.tokenAmount.amount),
			);
		} else {
			const mpl = new Metaplex(connection);
			const mintAddress = new PublicKey(tokenAccount.mint);
			const tokenATAddress = getAssociatedTokenAddressSync(
				new PublicKey(tokenAccount.mint),
				wallet,
			);
			const collectible = (await mpl.nfts().findByMint({
				mintAddress,
				tokenAddress: tokenATAddress,
				tokenOwner: tokenAccount.publicKey,
			})) as SftWithToken | NftWithToken;

			const collectibleDocument = constructCollectibleDocument(
				wallet.toString(),
				collectible,
				cluster,
			);
			await updateCollectibleToStorage(
				connection,
				cluster,
				collectibleDocument,
			);
		}
	}
};

const newAccountSignature = 'Initialize the associated token account';

export const watchLogs = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
	commitment: Finality = 'confirmed',
) => {
	connection.onLogs(
		wallet,
		async (change) => {
			const { logs } = change;
			const init = logs.find((log) => log.includes(newAccountSignature));
			if (init) {
				try {
					await handleInitAccountOnLogsChange(
						change,
						connection,
						cluster,
						wallet,
					);
				} catch (error) {
					logger.error('Failed to handle log change', error);
				}
			}
		},
		commitment,
	);
};

const handleInitAccountOnLogsChange = async (
	change: Logs,
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
) => {
	const { signature } = change;
	const transaction = await throttle(() => {
		return connection.getTransaction(signature, {
			commitment: 'confirmed',
			maxSupportedTransactionVersion: 0,
		});
	})();
	if (!transaction) return;

	const tokenBalances = transaction.meta?.postTokenBalances?.filter(
		(balance) => balance.owner === wallet.toString(),
	);

	const promises = tokenBalances?.map(async (t) => {
		const isToken = t.uiTokenAmount.decimals !== 0;
		const mintAddress = new PublicKey(t.mint);
		const tokenAddress = getAssociatedTokenAddressSync(mintAddress, wallet);
		if (isToken && t.uiTokenAmount.amount !== '0') {
			const token = await initTokenDocumentWithMetadata(connection, cluster, {
				mint: t.mint,
				owner: t.owner as string,
				publicKey: tokenAddress,
				state: 'initialized',
				tokenAmount: t.uiTokenAmount,
			});

			const quotes = await getTokenQuotes([
				{ address: token.mint, network: token.network },
			]);
			token.quotes =
				quotes[
					makeHashId({ address: token.mint, network: token.network })
				].quotes;
			await addTokenToStorage(token);
		} else {
			const mpl = new Metaplex(connection);
			const collectible = (await mpl.nfts().findByMint({
				mintAddress,
				tokenAddress,
			})) as SftWithToken | NftWithToken;

			const collectibleDocument = constructCollectibleDocument(
				wallet.toString(),
				collectible,
				cluster,
			);

			await updateCollectibleToStorage(
				connection,
				cluster,
				collectibleDocument,
			);
		}
	}) as never[];

	await Promise.all(promises);
};

const updateTokenBalanceToStorage = async (
	id: string,
	balance: number,
	amount: string,
) => {
	return await storage.upsert<TokenDocument<SolanaToken>>(
		id,
		async (prevDoc) => {
			prevDoc.balance = balance;
			prevDoc.amount = amount;

			return prevDoc;
		},
	);
};
