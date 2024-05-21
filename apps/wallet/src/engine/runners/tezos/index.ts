import { TezosToolkit } from '@taquito/taquito';
import {} from '@taquito/tzip16';
import { Networks } from '@walless/core';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { storage } from 'utils/storage';

import type { EngineConfig, Runner } from '../../types';

export type TezosContext = {
	connection: TezosToolkit;
};

const MAIN_NET = 'https://api.tez.ie/rpc/mainnet';
const GHOST_NET = 'https://ghostnet.ecadinfra.com';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTezosRunner = async (
	config: EngineConfig,
): Promise<Runner> => {
	const { networkClusters } = config;
	const cluster = networkClusters[Networks.tezos];
	const rpc = cluster === 'mainnet' ? MAIN_NET : GHOST_NET;
	const ghost = GHOST_NET;

	const keysResult = await storage.find<PublicKeyDocument>(selectors.tezosKeys);
	const keys = keysResult.docs;

	return {
		async start() {
			const tokensPromises = keys.map(async (key) => {
				const owner = key._id;
				const connection = new TezosToolkit(rpc);
				const tzBalance = await connection.tz.getBalance(owner);
				const tokens = await fetch('https://api.tzkt.io/v1/tokens');
				const balances = await fetch(
					'https://stage.tzpro.io/v1/wallets/{address}/balances',
				);
				const tokensJson = await tokens.json();
				const balancesJson = await balances.json();
				console.log(balancesJson);
				console.log(tokensJson);
				console.log(tzBalance);

				return tzBalance;
			});
			await Promise.all(tokensPromises).catch((e) => {
				console.error(e);
			});
		},
		stop() {},
		getContext: (): TezosContext => {
			return {} as TezosContext;
		},
		restart: () => {},
	};
};
