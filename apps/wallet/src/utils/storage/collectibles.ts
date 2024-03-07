import type { CollectionV2, NftV2 } from '@walless/core';
import { logger } from '@walless/core';
import type { CollectionDocumentV2, NftDocumentV2 } from '@walless/store';

import { storage } from './db';

const getNftByIdFromStorage = async <T extends NftV2 = NftV2>(
	id: string,
): Promise<NftDocumentV2<T> | undefined> => {
	return await storage.safeGet(id);
};

const getCollectionByIdFromStorage = async <
	T extends CollectionV2 = CollectionV2,
>(
	id: string,
): Promise<CollectionDocumentV2<T> | undefined> => {
	return await storage.safeGet(id);
};

const addCollectibleToStorage = async <T extends NftV2 = NftV2>(
	id: string,
	item: NftDocumentV2<T>,
) => {
	return storage
		.upsert<T>(id, async () => item, { new: true })
		.catch(logger.warn);
};

const addCollectionToStorage = async <T extends CollectionV2 = CollectionV2>(
	id: string,
	item: CollectionDocumentV2<T>,
) => {
	return storage
		.upsert<CollectionDocumentV2<T>>(id, async () => item, { new: true })
		.catch(logger.warn);
};

const updateNftAmountToStorage = async <T extends NftV2 = NftV2>(
	id: string,
	amount: number,
) => {
	return await storage
		.upsert<NftDocumentV2<T>>(id, async (prevDoc) => {
			prevDoc.amount = amount;

			return prevDoc;
		})
		.catch(logger.warn);
};

export {
	addCollectibleToStorage,
	addCollectionToStorage,
	getCollectionByIdFromStorage,
	getNftByIdFromStorage,
	updateNftAmountToStorage,
};
