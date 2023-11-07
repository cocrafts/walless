import { modules } from '@walless/ioc';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';

const getCollectibleById = async (
	id: string,
): Promise<CollectibleDocument | undefined> => {
	return await modules.storage.safeGet(id);
};

const getCollectionById = async (
	id: string,
): Promise<CollectionDocument | undefined> => {
	return await modules.storage.safeGet(id);
};

const setCollectible = async (id: string, item: CollectibleDocument) => {
	return await modules.storage.upsert(id, async () => item);
};

const setCollection = async (id: string, item: CollectionDocument) => {
	return await modules.storage.upsert(id, async () => item);
};

const updateCollectibleAmount = async (
	id: string,
	amount: number,
): Promise<boolean> => {
	const collectible = await getCollectibleById(id);

	if (!collectible) return false;

	const result = await modules.storage.upsert<CollectibleDocument>(
		id,
		async (prevDoc) => {
			prevDoc.account.amount = amount;

			return prevDoc;
		},
	);

	return result.ok;
};

const updateCollectionAmount = async (
	id: string,
	count: number,
): Promise<boolean> => {
	const result = await modules.storage.upsert<CollectionDocument>(
		id,
		async (prevDoc) => {
			prevDoc.count = count;

			return prevDoc;
		},
	);

	return result.ok;
};

const removeCollectibleDoc = async (id: string): Promise<void> => {
	const collectible = await getCollectibleById(id);

	if (!collectible) return;

	const collection = await getCollectionById(collectible!.collectionId);
	const collectionCount = collection!.count - 1;
	if (collectionCount === 0) {
		await modules.storage.removeDoc(collection!._id);
	} else {
		await modules.storage.upsert<CollectionDocument>(
			collection!._id,
			async (prevDoc) => {
				prevDoc.count = collectionCount;

				return prevDoc;
			},
		);
	}

	await modules.storage.removeDoc(id);
};

export {
	getCollectibleById,
	getCollectionById,
	removeCollectibleDoc,
	setCollectible,
	setCollection,
	updateCollectibleAmount,
	updateCollectionAmount,
};
