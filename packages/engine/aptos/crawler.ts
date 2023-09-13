import { Networks } from '@walless/core';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { AptosClient, HexString } from 'aptos';

import { tokenActions } from '../state/tokens';
import type { EngineRunner } from '../utils/type';

import { APTOS_COIN, APTOS_DEVNET } from './shared';

export const aptosEngineRunner: EngineRunner<unknown> = {
	start: async (context) => {
		const { storage } = context;
		const keyResult = await storage.find(selectors.aptosKeys);
		const keys = keyResult.docs as PublicKeyDocument[];

		// Aptos Hackathon
		const pubkeyShortString = keys[0]._id;
		const pubkey = new HexString(pubkeyShortString);
		const aptosClient = new AptosClient(APTOS_DEVNET);

		const tokenDocuments: TokenDocument[] = [];

		const resources = await aptosClient.getAccountResources(pubkey.hex());
		const accountResource = resources.find((r) => r.type === APTOS_COIN);
		const balance = BigInt(
			(accountResource!.data as any).coin.value,
		).toString();

		const tokenAPT: TokenDocument = {
			_id: 'aptos#coin',
			type: 'Token',
			network: Networks.aptos,
			account: {
				decimals: 8,
				balance: balance,
			},
			metadata: {
				name: 'APT',
				symbol: 'APT',
				imageUri: '/img/network/aptos-icon.svg',
			},
		};

		tokenDocuments.push(tokenAPT);

		tokenActions.setItems(tokenDocuments);
		// End of Aptos Hackathon
	},

	stop: async () => {
		// subscriptionList.forEach((subscriptionId) => {
		// 	connection.removeAccountChangeListener(subscriptionId);
		// });
	},
};
