import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import type { SuiToken } from '@walless/core';
import { logger, Networks } from '@walless/core';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { getTokenQuote } from 'utils/api';
import { addTokenToStorage, storage } from 'utils/storage';

import type { EngineConfig, Runner } from '../../types';

import { constructSuiTokenDocument, groupCoinByType } from './tokens';

export type SuiContext = {
	client: SuiClient;
};

export const createSuiRunner = async (
	config: EngineConfig,
): Promise<Runner> => {
	const { networkClusters } = config;
	const cluster = networkClusters[Networks.sui];
	const nodeUrl =
		cluster === 'mainnet'
			? getFullnodeUrl('mainnet')
			: getFullnodeUrl('devnet');
	const client = new SuiClient({ url: nodeUrl });

	const keysResult = await storage.find<PublicKeyDocument>(selectors.suiKeys);
	const keys = keysResult.docs;

	return {
		async start() {
			const tokensPromises = keys.map(async (key) => {
				const owner = key._id;
				const coins = await client.getAllCoins({ owner });
				const groupedCoin = groupCoinByType(coins);

				const promises = Object.keys(groupedCoin).map(async (coinType) => {
					const coinObjects = groupedCoin[coinType] || [];
					const tokenDocument = await constructSuiTokenDocument(
						client,
						cluster,
						owner,
						coinObjects,
					);
					if (!tokenDocument) return;

					try {
						const responseQuotes = await getTokenQuote({
							address: tokenDocument.coinType,
							network: tokenDocument.network,
						});
						tokenDocument.quotes = responseQuotes?.quotes;
					} catch (e) {
						logger.error('failed to get token quote', e);
					}

					if (tokenDocument)
						await addTokenToStorage<TokenDocument<SuiToken>>(tokenDocument);

					return tokenDocument;
				});

				return await Promise.all(promises);
			});

			await Promise.all([...tokensPromises]);
		},
		stop() {},
		getContext: (): SuiContext => {
			return { client };
		},
		restart: () => {},
	};
};
