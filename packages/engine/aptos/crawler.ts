import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { type Provider, FaucetClient, HexString } from 'aptos';

import { tokenActions } from '../state/tokens';
import type { EngineRunner } from '../utils/type';

import { APTOS_DEVNET, APTOS_FAUCET_DEVNET } from './shared';

export const aptosEngineRunner: EngineRunner<Provider> = {
	start: async (context) => {
		const { connection, storage } = context;

		const keyResult = await storage.find(selectors.aptosKeys);
		const keys = keyResult.docs as PublicKeyDocument[];

		const pubkey = new HexString(keys[0]._id);

		try {
			const data = await connection.getAccountResources(pubkey);
			console.log('--> data', data);

			const tokenDocuments: TokenDocument[] = [];

			tokenActions.setItems(tokenDocuments);
		} catch (error) {
			// Create account in devnet for __DEV__ mode
			const faucet = new FaucetClient(APTOS_DEVNET, APTOS_FAUCET_DEVNET);
			await faucet.fundAccount(pubkey, 1000000000);
		}
	},
	stop: async () => {
		// MIGHT UPDATE THIS IN THE FUTURE
	},
};
