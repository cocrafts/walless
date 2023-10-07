import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { HexString, Network, Provider } from 'aptos';

import { aptosActions } from '../../state/aptos';
import { tokenActions } from '../../state/token';
import { createConnectionPool } from '../../utils/pool';
import type { EngineRunner } from '../../utils/type';

import { getCoins } from './coins';

export const aptosPool = createConnectionPool<Provider>({
	create: (id) => new Provider(aptosEndpoints[id]),
});

export const aptosEndpoints: Record<string, Network> = {
	devnet: Network.DEVNET,
	testnet: Network.TESTNET,
	mainnet: Network.MAINNET,
};

interface TokenResource {
	direct_transfer: boolean;
}

let interval: NodeJS.Timeout[] = [];

export const aptosEngineRunner: EngineRunner<Provider> = {
	start: async (context) => {
		const { storage } = modules;
		const { connection } = context;

		const data = await storage.find(selectors.aptosKeys);
		const keys = data.docs as PublicKeyDocument[];

		for (const key of keys) {
			const pubkey = new HexString(key._id);

			try {
				const resource = await connection.getAccountResource(
					pubkey,
					'0x3::token::TokenStore',
				);
				const hasOptedIn = (resource.data as TokenResource).direct_transfer;
				aptosActions.setDirectTransfer(hasOptedIn);
			} catch (error) {
				aptosActions.setDirectTransfer(false);
			}

			const constructAptosData = async () => {
				try {
					const tokenDocuments = await getCoins(connection, pubkey);
					tokenActions.setItems(tokenDocuments);
				} catch (error) {
					console.log('--> aptos crawler coins error', error);
				}
			};

			interval.push(setInterval(constructAptosData, 1000 * 5));
		}
	},
	stop: async () => {
		for (const item of interval) {
			clearInterval(item);
		}
		interval = [];
	},
};
