import { modules } from '@walless/ioc';
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
	setStorageCollectible: async (id: string, item: CollectibleDocument) => {
		await modules.storage.upsert<CollectibleDocument>(id, async () => item);
	},
	setStorageCollection: async (id: string, item: CollectionDocument) => {
		await modules.storage.upsert<CollectionDocument>(id, async () => item);
	},
	updateCollectibleAmount: async (id: string, amount: number) => {
		const result = await modules.storage.upsert<CollectibleDocument>(
			id,
			async (prevDoc) => {
				prevDoc.account.amount = amount;

				return prevDoc;
			},
		);

		return result.ok;
	},
};

export * from './internal';
