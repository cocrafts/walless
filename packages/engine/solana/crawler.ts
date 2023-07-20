import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { AccountChangeCallback, Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { TokenInfo } from '@walless/graphql';
import { qlClient, queries } from '@walless/graphql';
import { solMint } from '@walless/network';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { flatten } from 'lodash';

import { collectibleActions } from '../state/collectibles';
import { tokenActions } from '../state/tokens';
import type { EngineRunner } from '../utils/type';

import { solanaCollectiblesByAddress } from './collectibles';
import { solanaTokensByAddress } from './token';

const subscriptionList: number[] = [];

export const solanaEngineRunner: EngineRunner<Connection> = {
	start: async ({ endpoint, connection, storage }) => {
		const keyResult = await storage.find(selectors.solanaKeys);
		const keys = keyResult.docs as PublicKeyDocument[];
		const tokenPromises = [];
		const collectiblePromises = [];

		// Realtime handler
		if (keys[0]._id) {
			const owner_pubkey = new PublicKey(keys[0]._id);
			const nfts: string[] = [];

			const handleAccountChange: AccountChangeCallback = (info) => {
				let owner: string;
				let mint: string;
				let balance: string;

				const isSOL = info.data.byteLength === 0;

				if (isSOL) {
					owner = owner_pubkey.toString();
					mint = solMint;
					balance = info.lamports.toString();
				} else {
					const data = AccountLayout.decode(info.data);
					owner = data.owner.toString();
					mint = data.mint.toString();
					balance = data.amount.toString();

					const isNFT = nfts.includes(mint);
					if (isNFT) {
						collectibleActions.updateCollectible(owner, mint);
					}
				}

				tokenActions.updateBalance(owner, mint, balance);
			};

			const parsedTokenAccounts =
				await connection.getParsedTokenAccountsByOwner(owner_pubkey, {
					programId: TOKEN_PROGRAM_ID,
				});

			subscriptionList.push(
				connection.onAccountChange(owner_pubkey, handleAccountChange),
			);

			parsedTokenAccounts.value.forEach((ata) => {
				subscriptionList.push(
					connection.onAccountChange(ata.pubkey, handleAccountChange),
				);
				if (ata.account.data.parsed.info.tokenAmount.decimals === 0) {
					nfts.push(ata.account.data.parsed.info.mint.toString());
				}
			});
		}
		// End of realtime handler

		for (const key of keys) {
			tokenPromises.push(
				solanaTokensByAddress({
					endpoint,
					storage,
					connection,
					address: key._id,
				}),
			);

			collectiblePromises.push(
				solanaCollectiblesByAddress({
					endpoint,
					connection,
					address: key._id,
				}),
			);
		}

		const promises = [];
		promises.push(
			Promise.all(tokenPromises).then(async (tokenChunks) => {
				const tokenDocuments = flatten(tokenChunks);
				const makeId = (i: TokenDocument) => `${i.network}#${i.account.mint}`;

				try {
					const { tokensByAddress } = await qlClient.request<
						{ tokensByAddress: TokenInfo[] },
						{ addresses: string[] }
					>(queries.tokensByAddress, {
						addresses: tokenDocuments.map(makeId),
					});

					const quoteMap = tokensByAddress.reduce((a, i) => {
						a[i.address as string] = i;
						return a;
					}, {} as Record<string, TokenInfo>);

					for (const i of tokenDocuments) {
						i.account.quotes = quoteMap[makeId(i)].quotes;
					}
				} catch (_) {
					console.log('cannot fetch solana token price');
				}

				tokenActions.setItems(tokenDocuments);
			}),
		);

		promises.push(
			Promise.all(collectiblePromises).then(async (results) => {
				collectibleActions.setCollections(
					flatten(results.map((result) => result.collections)),
				);
				collectibleActions.setCollectibles(
					flatten(results.map((result) => result.collectibles)),
				);
			}),
		);

		return await Promise.all(promises);
	},
	stop: async ({ connection }) => {
		subscriptionList.forEach((subscriptionId) => {
			connection.removeAccountChangeListener(subscriptionId);
		});

		console.log('stop solana');
	},
};
