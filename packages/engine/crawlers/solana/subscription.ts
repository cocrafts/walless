import { Metaplex } from '@metaplex-foundation/js';
import { AccountLayout } from '@solana/spl-token';
import type { ParsedAccountData } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { AssetMetadata } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { modules } from '@walless/ioc';
import {
	addTokensToStorage,
	getTokenByIdFromStorage,
	removeCollectibleFromStorage,
	removeTokenFromStorage,
	type TokenDocument,
	updateCollectibleAmountToStorage,
	updateTokenBalanceToStorage,
} from '@walless/store';

import { addCollectible } from './collectibles';
import { getMetadata, solMint } from './metadata';
import type { SolanaContext } from './shared';
import { throttle } from './shared';
import { solanaFungiblesByAddress } from './token';

/**
 * All cases we need to subscribe
 * - Send, receive native token
 * - Send SPL token, NFT to wallet which has ATA for this token
 * - Send SPL token, NFT to wallet which does not have ATA for this token
 * - Receive SPL token, NFT which we have ATA for
 * - Receive SPL token, NFT which we don't have ATA for
 * */

const accountChangeIds: number[] = [];
const logIds: number[] = [];

export const registerAccountChanges = async (
	context: SolanaContext,
	key: PublicKey,
	ownerPubkey: PublicKey,
) => {
	const { connection, endpoint } = context;
	const owner = ownerPubkey.toString();
	const id = connection.onAccountChange(
		key,
		async (info) => {
			let mint: string;
			let balance: string;
			let isToken: boolean;
			const isNativeToken = info.data.byteLength === 0;
			const mpl = new Metaplex(connection);

			if (isNativeToken) {
				mint = solMint;
				balance = info.lamports.toString();
				isToken = true;
			} else {
				const data = AccountLayout.decode(info.data);
				mint = data.mint.toString();
				balance = data.amount.toString();
				const tokenAccount = await connection.getParsedAccountInfo(
					new PublicKey(mint),
				);
				const tokenInfo = (tokenAccount.value?.data as ParsedAccountData).parsed
					.info;

				isToken = tokenInfo.decimals !== 0;
			}

			const tokenId = `${owner}/token/${mint}`;

			if (isToken) {
				const isTokenExisted = !!(await getTokenByIdFromStorage(tokenId));
				if (isTokenExisted) {
					balance !== '0'
						? updateTokenBalanceToStorage(tokenId, balance)
						: removeTokenFromStorage(tokenId);
				} else {
					const fungibleTokens = await solanaFungiblesByAddress(
						context,
						ownerPubkey,
					);
					addTokensToStorage(fungibleTokens);
				}
			} else if (!isToken) {
				const amount = parseInt(balance);
				const collectibleId = `${owner}/collectible/${mint}`;

				if (amount === 0) {
					removeCollectibleFromStorage(collectibleId);
				} else if (
					!(await updateCollectibleAmountToStorage(collectibleId, amount))
				) {
					try {
						const mintAddress = new PublicKey(mint);
						const nft = await mpl.nfts().findByMint({ mintAddress });

						addCollectible(connection, endpoint, owner, nft);
					} catch (e) {
						console.log('add collectible error', e);
					}
				}
			} else {
				// TODO: need to handle if got this message
				console.log('account change unknown');
			}
		},
		'confirmed',
	);

	accountChangeIds.push(id);
};

const newAccountSignature = 'Initialize the associated token account';

export const watchLogs = async (context: SolanaContext, pubkey: PublicKey) => {
	const { connection, endpoint } = context;
	const address = pubkey.toString();

	const id = connection.onLogs(
		pubkey,
		async ({ logs, signature }) => {
			const init = logs.find((log) => log.includes(newAccountSignature));

			if (init) {
				const transaction = await throttle(() => {
					return connection.getTransaction(signature, {
						commitment: 'confirmed',
						maxSupportedTransactionVersion: 0,
					});
				})();
				const tokenBalances = transaction?.meta?.postTokenBalances?.filter(
					(balance) => balance.owner === pubkey.toString(),
				);

				for (const balance of tokenBalances || []) {
					if (
						balance.uiTokenAmount.decimals === 0 &&
						balance.uiTokenAmount.amount !== '0'
					) {
						const mpl = new Metaplex(connection);
						const nft = await mpl
							.nfts()
							.findByMint({ mintAddress: new PublicKey(balance.mint) });

						addCollectible(connection, endpoint, address, nft);
					} else if (balance.uiTokenAmount.decimals !== 0) {
						let token: TokenInfo = {} as never;
						let metadata: AssetMetadata | undefined;

						try {
							const { tokenByAddress } = await modules.qlClient.request<
								{ tokenByAddress: TokenInfo },
								{ address: string }
							>(queries.tokenByAddress, {
								address: `${Networks.solana}#${balance.mint}`,
							});

							token = tokenByAddress;
						} catch (error) {
							console.log('Error during fetching token quotes');
						}

						try {
							metadata = await getMetadata(context, balance.mint);
						} catch (error) {
							console.log('Error during get Solana metadata', error);
						}

						const tokenDocument: TokenDocument = {
							_id: `${address}/token/${balance.mint}`,
							network: Networks.solana,
							endpoint,
							type: 'Token',
							account: {
								mint: balance.mint,
								owner: balance.owner,
								address,
								balance: balance.uiTokenAmount.amount,
								decimals: balance.uiTokenAmount.decimals,
								quotes: token.quotes,
							},
							metadata,
						};

						addTokensToStorage([tokenDocument]);
					}
				}
			}
		},
		'confirmed',
	);

	logIds.push(id);
};
