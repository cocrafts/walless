import { modules } from '@walless/ioc';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';

const getCollectibleByIdFromStorage = async (
	id: string,
): Promise<CollectibleDocument | undefined> => {
	return await modules.storage.safeGet(id);
};

const getCollectionByIdFromStorage = async (
	id: string,
): Promise<CollectionDocument | undefined> => {
	return await modules.storage.safeGet(id);
};

const addCollectibleToStorage = async (
	id: string,
	item: CollectibleDocument,
) => {
	return await modules.storage.upsert(id, async () => item);
};

const addCollectionToStorage = async (id: string, item: CollectionDocument) => {
	return await modules.storage.upsert(id, async () => item);
};

const updateCollectibleAmountToStorage = async (
	id: string,
	amount: number,
): Promise<boolean> => {
	const collectible = await getCollectibleByIdFromStorage(id);

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

const updateCollectionAmountToStorage = async (
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

const removeCollectibleFromStorage = async (id: string): Promise<void> => {
	const collectible = await getCollectibleByIdFromStorage(id);

	if (!collectible) return;

	const collection = await getCollectionByIdFromStorage(
		collectible!.collectionId,
	);
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
	addCollectibleToStorage,
	addCollectionToStorage,
	getCollectibleByIdFromStorage,
	getCollectionByIdFromStorage,
	removeCollectibleFromStorage,
	updateCollectibleAmountToStorage,
	updateCollectionAmountToStorage,
};
