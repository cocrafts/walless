import type { CollectibleDocument, CollectionDocument } from '@walless/store';

import { collectibleState, collectionState } from './internal';

export const collectibleActions = {
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
};

export * from './internal';
