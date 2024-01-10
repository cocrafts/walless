import type { AptosPendingToken } from '@walless/core';
import type {
	CollectibleDocument,
	CollectionDocument,
	TokenDocument,
} from '@walless/store';

import { aptosState } from './aptos';
import { collectibleState, collectionState } from './collectibles';
import { tokenState } from './tokens';

export const assetsActions = {
	setTokens: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.map.set(item._id, item);
		}
	},
	setCollectibles: (items: CollectibleDocument[]) => {
		for (const item of items) {
			collectibleState.map.set(item._id, item);
		}
	},
	setCollections: (items: CollectionDocument[]) => {
		for (const item of items) {
			collectionState.map.set(item._id, item);
		}
	},
	setDirectTransfer: (directTransfer: boolean) => {
		aptosState.directTransfer = directTransfer;
	},
	setPendingTokens: (tokens: AptosPendingToken[]) => {
		const { pendingTokens } = aptosState;
		pendingTokens.clear();
		for (const token of tokens) {
			pendingTokens.set(token.tokenDataId, token);
		}
	},
};

export { collectibleState, collectionState, tokenState };
export * from './aptos';
