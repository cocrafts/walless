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
		const collectible = collectibleState.map.get(id);

		if (!collectible) return false;

		const result = await modules.storage.upsert<CollectibleDocument>(
			id,
			async (prevDoc) => {
				prevDoc.account.amount = amount;

				return prevDoc;
			},
		);

		return result.ok;
	},
	updateCollectionAmount: async (id: string, count: number) => {
		const result = await modules.storage.upsert<CollectionDocument>(
			id,
			async (prevDoc) => {
				prevDoc.count = count;

				return prevDoc;
			},
		);

		return result.ok;
	},
	removeCollectibleDoc: async (id: string) => {
		const collectible = await modules.storage.safeGet<CollectibleDocument>(id);
		const collection = await modules.storage.safeGet<CollectionDocument>(
			collectible!.collectionId,
		);
		const collectionCount = collection!.count - 1;

		if (collectionCount === 0) {
			await modules.storage.removeDoc(collection!._id);
		} else {
			await modules.storage.upsert<CollectionDocument>(
				collection!._id,
				async (prevDoc) => {
					prevDoc.count -= 1;

					return prevDoc;
				},
			);
		}

		await modules.storage.removeDoc(collectible!._id);
	},
};

export * from './internal';
