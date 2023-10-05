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
	updateCollectibleAmount: (id: string, amount: number) => {
		const collectible = collectibleState.map.get(id);

		if (collectible) {
			const collection = collectionState.map.get(collectible.collectionId);
			if (collection) {
				collection.count += amount - collectible.account.amount;
			}
			collectible.account.amount = amount;

			return true;
		}

		return false;
	},
};

export * from './internal';
