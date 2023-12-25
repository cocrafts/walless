import { logger } from '@walless/core';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';
import type { Provider } from 'aptos';
import { HexString } from 'aptos';

import { aptosActions, aptosState } from '../../state/aptos';
import { tokenActions } from '../../state/token';
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
					const tokenDocuments = await getCoins(connection, pubkey);
					tokenActions.setItems(tokenDocuments);
				} catch (error) {
					// Error means that the account is not created yet
				}

				try {
					const resource = await connection.getAccountResource(
						pubkey,
						'0x3::token::TokenStore',
					);
					const hasOptedIn = (resource.data as TokenResource).direct_transfer;
					if (hasOptedIn !== aptosState.directTransfer) {
						aptosActions.setDirectTransfer(hasOptedIn);
					}
				} catch (error) {
					aptosActions.setDirectTransfer(false);
				}

				try {
					const pendingNfts = await getPendingTokens(endpoint, pubkey);
					// NOTE: it is better to have a deep comparison here
					if (pendingNfts.length !== aptosState.pendingTokens.size) {
						aptosActions.setPendingTokens(pendingNfts);
					}
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
