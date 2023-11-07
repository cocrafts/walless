import { Metaplex } from '@metaplex-foundation/js';
import { AccountLayout } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import type { AssetMetadata } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { TokenDocument } from '@walless/store';

import { tokenActions, tokenState } from '../../state/token';
import {
	removeCollectibleDoc,
	updateCollectibleAmount,
} from '../../utils/collectibles';

import { addCollectibleToStorage } from './collectibles';
import { getMetadata, solMint } from './metadata';
import type { SolanaContext } from './shared';
import { throttle } from './shared';

const accountChangeIds: number[] = [];
const logIds: number[] = [];

export const registerAccountChanges = async (
	{ connection, endpoint }: SolanaContext,
	key: PublicKey,
	ownerPubkey: PublicKey,
) => {
	const address = key.toString();
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
			const isToken = tokenState.map.get(tokenId);

			if (isToken) {
				tokenActions.updateBalance(tokenId, balance);
			} else {
				const amount = parseInt(balance);
				const collectibleId = `${owner}/collectible/${mint}`;

				if (amount === 0) {
					removeCollectibleDoc(collectibleId);
				} else if (!(await updateCollectibleAmount(collectibleId, amount))) {
					const mpl = new Metaplex(connection);
					try {
						const mintAddress = new PublicKey(mint);
						const nft = await mpl.nfts().findByMint({ mintAddress });

						addCollectibleToStorage(connection, endpoint, owner, nft);
					} catch {
						console.log('Not found any token or nft to update', {
							address,
							mint,
							balance,
						});
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
					if (balance.uiTokenAmount.decimals === 0) {
						if (balance.uiTokenAmount.amount === '1') {
							const mpl = new Metaplex(connection);
							const nft = await mpl
								.nfts()
								.findByMint({ mintAddress: new PublicKey(balance.mint) });
							addCollectibleToStorage(connection, endpoint, address, nft);
						}
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

						tokenActions.setTokens([tokenDocument]);
					}
				}
			}
		},
		'confirmed',
	);

	logIds.push(id);
};
