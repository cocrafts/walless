import {
	type CollectibleDocument,
	type CollectionDocument,
} from '@walless/store';

import { collectiblesState, collectionsState } from './internal';

export const collectibleActions = {
	setCollectibles: (items: CollectibleDocument[]) => {
		for (const item of items) {
			collectiblesState.map.set(item._id, item);
		}
	},
	setCollections: (items: CollectionDocument[]) => {
		for (const item of items) {
			collectionsState.map.set(item._id, item);
		}
	},
	updateCollectibleAmount: (id: string, amount: number) => {
		const collectible = collectiblesState.map.get(id);
		if (collectible) {
			const collection = collectionsState.map.get(collectible.collectionId);
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
