import type { Collection, Nft } from '@walless/core';
import { logger } from '@walless/core';
import type { CollectionDocument, NftDocument } from '@walless/store';

import { storage } from './db';

const getNftByIdFromStorage = async <T extends Nft = Nft>(
	id: string,
): Promise<NftDocument<T> | undefined> => {
	return await storage.safeGet(id);
};

const getCollectionByIdFromStorage = async <
	T extends Collection = Collection,
>(
	id: string,
): Promise<CollectionDocument<T> | undefined> => {
	return await storage.safeGet(id);
};

const addCollectibleToStorage = async <T extends Nft = Nft>(
	id: string,
	item: NftDocument<T>,
) => {
	return storage
		.upsert<T>(id, async () => item, { new: true })
		.catch(logger.warn);
};

const addCollectionToStorage = async <T extends Collection = Collection>(
	id: string,
	item: CollectionDocument<T>,
) => {
	return storage
		.upsert<CollectionDocument<T>>(id, async () => item, { new: true })
		.catch(logger.warn);
};

const updateNftAmountToStorage = async <T extends Nft = Nft>(
	id: string,
	amount: number,
) => {
	return await storage
		.upsert<NftDocument<T>>(id, async (prevDoc) => {
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
