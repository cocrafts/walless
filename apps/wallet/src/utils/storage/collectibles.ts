import { logger } from '@walless/core';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';

import { storage } from './db';

const getCollectibleByIdFromStorage = async (
	id: string,
): Promise<CollectibleDocument | undefined> => {
	return await storage.safeGet(id);
};

const getCollectionByIdFromStorage = async (
	id: string,
): Promise<CollectionDocument | undefined> => {
	return await storage.safeGet(id);
};

const addCollectibleToStorage = async (
	id: string,
	item: CollectibleDocument,
) => {
	return storage
		.upsert<CollectibleDocument>(id, async () => item, { new: true })
		.catch(logger.warn);
};

const addCollectionToStorage = async (id: string, item: CollectionDocument) => {
	return storage
		.upsert<CollectionDocument>(id, async () => item, { new: true })
		.catch(logger.warn);
};

const updateCollectibleAmountToStorage = async (id: string, amount: number) => {
	return await storage
		.upsert<CollectibleDocument>(id, async (prevDoc) => {
			prevDoc.account.amount = amount;

			return prevDoc;
		})
		.catch(logger.warn);
};

export {
	addCollectibleToStorage,
	addCollectionToStorage,
	getCollectibleByIdFromStorage,
	getCollectionByIdFromStorage,
	updateCollectibleAmountToStorage,
};
