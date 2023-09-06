import { PublicKey } from '@solana/web3.js';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { flatten } from 'lodash';

import { tokenActions } from '../../state/token';

import type { SolanaRunner } from './shared';
import { makeHashId } from './shared';
import {
	getTokenQuotes,
	getTokenType,
	throttle,
	tokenProgramFilter,
	TokenType,
} from './shared';
import { getNativeTokenDocument, getSPLTokenDocument } from './token';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const { connection } = context;
		const key = await modules.storage.find<PublicKeyDocument>(
			selectors.solanaKeys,
		);

		for (const item of key.docs) {
			const pk = new PublicKey(item._id);
			const fungibleChunkPromises: Promise<TokenDocument>[] = [
				getNativeTokenDocument(context, pk),
			];
			const parsedTokenAccounts = await throttle(() => {
				return connection.getParsedTokenAccountsByOwner(pk, tokenProgramFilter);
			})();

			for (const { account } of parsedTokenAccounts.value) {
				const tokenType = getTokenType(account);

				if (tokenType === TokenType.Fungible) {
					fungibleChunkPromises.push(getSPLTokenDocument(context, pk, account));
				}
			}

			const fungibleChunks = await Promise.all(fungibleChunkPromises);
			const flattenFungibles = flatten(fungibleChunks);
			const quotes = await getTokenQuotes(fungibleChunks);

			for (const item of flattenFungibles) {
				item.account.quotes = quotes[makeHashId(item)].quotes;
			}

			tokenActions.setItems(flattenFungibles);
		}
	},
	stop: async () => {
		console.log('stop!');
	},
};
