import { logger } from '@walless/core';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import type { Provider } from 'aptos';
import { HexString } from 'aptos';

import type { EngineRunner } from '../../utils/type';

import { getCoins } from './coins';
import { constructAptosTokens, getPendingTokens } from './tokens';

interface TokenResource {
	direct_transfer: boolean;
}

let interval: NodeJS.Timer[] = [];

export const aptosEngineRunner: EngineRunner<Provider> = {
	start: async (context) => {
		const { storage } = modules;
		const { connection, endpoint } = context;

		const data = await storage.find(selectors.aptosKeys);
		const keys = data.docs as PublicKeyDocument[];

		for (const key of keys) {
			const pubkey = new HexString(key._id);

			const constructAptosData = async () => {
				try {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const tokenDocuments = await getCoins(connection, pubkey);
					// Need to store to db
					// tokenActions.setItems(tokenDocuments);
				} catch (error) {
					// Error means that the account is not created yet
				}

				try {
					const resource = await connection.getAccountResource(
						pubkey,
						'0x3::token::TokenStore',
					);
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const hasOptedIn = (resource.data as TokenResource).direct_transfer;
					// TODO: need to store direct transfer into db
				} catch (error) {
					// TODO: need to store direct transfer into db
				}

				try {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const pendingNfts = await getPendingTokens(endpoint, pubkey);
					// NOTE: it is better to have a deep comparison here
					// TODO: need to store pendingTokens into db
				} catch (error) {
					logger.error('Aptos crawler error', error);
				}

				try {
					await constructAptosTokens(connection, pubkey);
				} catch (error) {
					logger.error('aptos crawler error', error);
				}
			};

			constructAptosData();
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

export * from './shared';
