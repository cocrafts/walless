import { Metaplex } from '@metaplex-foundation/js';
import { AccountLayout } from '@solana/spl-token';
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
			const isNativeToken = info.data.byteLength === 0;

			if (isNativeToken) {
				mint = solMint;
				balance = info.lamports.toString();
			} else {
				const data = AccountLayout.decode(info.data);
				mint = data.mint.toString();
				balance = data.amount.toString();
			}

			const tokenId = `${owner}/token/${mint}`;
			const isToken = await getTokenByIdFromStorage(tokenId);

			if (isToken) {
				balance !== '0'
					? updateTokenBalanceToStorage(tokenId, balance)
					: removeTokenFromStorage(tokenId);
			} else {
				const amount = parseInt(balance);
				const collectibleId = `${owner}/collectible/${mint}`;

				if (amount === 0) {
					removeCollectibleFromStorage(collectibleId);
				} else if (
					!(await updateCollectibleAmountToStorage(collectibleId, amount))
				) {
					const mpl = new Metaplex(connection);
					try {
						const mintAddress = new PublicKey(mint);
						const nft = await mpl.nfts().findByMint({ mintAddress });

						addCollectible(connection, endpoint, owner, nft);
					} catch {
						const fungibleTokens = await solanaFungiblesByAddress(
							context,
							ownerPubkey,
						);
						addTokensToStorage(fungibleTokens);
					}
				}
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
						maxSupportedTransactionVersion: 2,
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
					} else {
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
