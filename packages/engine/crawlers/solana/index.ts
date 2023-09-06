import { Connection, PublicKey } from '@solana/web3.js';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';

import { tokenActions } from '../../state/token';
import { getTokenQuotes, makeHashId } from '../../utils/api';

import type { SolanaRunner } from './shared';
import {
	getTokenType,
	throttle,
	tokenProgramFilter,
	TokenType,
} from './shared';
import { registerAccountChanges, watchLogs } from './subscription';
import { getNativeTokenDocument, getSPLTokenDocument } from './token';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const { storage } = modules;
		const { connection } = context;
		const liveConnection = new Connection(connection.rpcEndpoint, 'confirmed');
		const key = await storage.find<PublicKeyDocument>(selectors.solanaKeys);

		for (const item of key.docs) {
			const currentPubkey = new PublicKey(item._id);
			const accountKeys = [currentPubkey];
			const fungiblePromises: Promise<TokenDocument>[] = [
				getNativeTokenDocument(context, currentPubkey),
			];

			watchLogs(context, liveConnection, currentPubkey);

			const parsedTokenAccounts = await throttle(() => {
				return connection.getParsedTokenAccountsByOwner(
					currentPubkey,
					tokenProgramFilter,
				);
			})();

			for (const { pubkey, account } of parsedTokenAccounts.value) {
				const tokenType = getTokenType(account);

				if (tokenType === TokenType.Fungible) {
					fungiblePromises.push(getSPLTokenDocument(context, pubkey, account));
				}

				accountKeys.push(pubkey);
			}

			const fungibleTokens = await Promise.all(fungiblePromises);
			const quotes = await getTokenQuotes(fungibleTokens);

			for (const item of fungibleTokens) {
				item.account.quotes = quotes[makeHashId(item)].quotes;
			}

			tokenActions.setItems(fungibleTokens);

			for (const key of accountKeys) {
				registerAccountChanges(context, liveConnection, key);
			}
		}
	},
	stop: async () => {
		console.log('stop!');
	},
};

export * from './shared';
