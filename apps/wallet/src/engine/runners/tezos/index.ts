import type { TezosToolkit } from '@taquito/taquito';
import type { TezosToken } from '@walless/core';
import { Networks } from '@walless/core';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { getTokenQuote } from 'utils/api';
import { addTokenToStorage, storage } from 'utils/storage';

import type { EngineConfig, Runner } from '../../types';

import { constructTezosTokenDocument, XTZ } from './token';
import { convertTezosImageUriToUrl, createContext } from './utils';

export type TezosContext = {
	connection: TezosToolkit;
	tzktApi: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTezosRunner = async (
	config: EngineConfig,
): Promise<Runner> => {
	const { networkClusters } = config;
	const cluster = networkClusters[Networks.tezos];
	const { connection, tzktApi } = createContext(config);

	const keysResult = await storage.find<PublicKeyDocument>(selectors.tezosKeys);
	const keys = keysResult.docs;

	return {
		async start() {
			const tokensPromises = keys.map(async (key) => {
				const owner = key._id;
				const tzBalance = await connection.tz.getBalance(owner);

				const tokenBalances = await fetch(
					`${tzktApi}/tokens/balances?account=${owner}`,
				);
				const tokenBalancesJson = await tokenBalances.json();

				const tzDocument = constructTezosTokenDocument({
					...XTZ,
					owner: key._id,
					cluster,
					amount: tzBalance.toString(),
					balance: parseFloat(tzBalance.toString()) / 10 ** XTZ.decimals,
				} as TezosToken);

				const responseQuotes = await getTokenQuote({
					address: `${tzDocument.contract?.address}`,
					network: tzDocument.network,
				});
				tzDocument.quotes = responseQuotes?.quotes;

				await addTokenToStorage<TokenDocument<TezosToken>>(tzDocument);

				for (const tokenBalance of tokenBalancesJson) {
					const tokenDocument = constructTezosTokenDocument({
						owner: key._id,
						network: Networks.tezos,
						cluster,
						tokenId: tokenBalance.token.tokenId,
						contract: tokenBalance.token.contract,
						tokenType: tokenBalance.token.standard,
						decimals: tokenBalance.token.metadata.decimals,
						symbol: tokenBalance.token.metadata.symbol,
						name: tokenBalance.token.metadata.name,
						amount: tokenBalance.balance,
						balance:
							parseFloat(tokenBalance.balance) /
							10 ** tokenBalance.token.metadata.decimals,
						image: convertTezosImageUriToUrl(
							tokenBalance.token.metadata.thumbnailUri,
						),
					} as TezosToken);

					const responseQuotes = await getTokenQuote({
						address: `${tokenDocument.contract?.address}`,
						network: tokenDocument.network,
					});
					tokenDocument.quotes = responseQuotes?.quotes;

					await addTokenToStorage<TokenDocument<TezosToken>>(tokenDocument);
				}

				return tzBalance;
			});
			await Promise.all(tokensPromises).catch(console.error);
		},
		stop() {},
		getContext: (): TezosContext => {
			return { connection, tzktApi } as TezosContext;
		},
		restart: () => {},
	};
};
