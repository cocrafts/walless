import type { PublicKey } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';
import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { chunk, flatten } from 'lodash';

import { tokenActions } from '../state/tokens';

import type { SolanaRunner } from './shared';
import { getTokenQuotes } from './shared';
import { getAllTokensByAddress } from './token';

export const solanaEngineRunner: SolanaRunner = {
	start: async (context) => {
		const { storage } = context;
		const key = await storage.find<PublicKeyDocument>(selectors.solanaKeys);
		const tokenChunkPromises = key.docs.map((item) => {
			return getAllTokensByAddress(context, item._id);
		});
		const tokenChunks = await Promise.all(tokenChunkPromises);
		const allTokens = flatten(tokenChunks);
		const makeId = (i: TokenDocument) => `${i.network}#${i.account.mint}`;
		const tokenIds = allTokens.map(makeId);
		const quotes = await getTokenQuotes(context, tokenIds);

		for (const token of allTokens) {
			token.account.quotes = quotes[makeId(token)].quotes;
		}

		tokenActions.setItems(allTokens);
	},
	stop: async () => {
		console.log('stop!');
	},
};
