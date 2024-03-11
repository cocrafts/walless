import type { AptosPendingToken } from '@walless/core';
import type {
	CollectionDocument,
	NftDocument,
	TokenDocument,
} from '@walless/store';

import { aptosState } from './aptos';
import { collectionState, nftState } from './nfts';
import { tokenState } from './tokens';

export const assetsActions = {
	setTokens: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.map.set(item._id, item);
		}
	},
	setNfts: (items: NftDocument[]) => {
		for (const item of items) {
			nftState.map.set(item._id, item);
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

export { collectionState, nftState, tokenState };
export * from './aptos';
