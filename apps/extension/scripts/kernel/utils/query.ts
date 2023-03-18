import { CollectibleRecord } from '@walless/storage';

import { db } from '../storage';

export const fetchCollectibles = async (): Promise<CollectibleRecord[]> => {
	const keys = await db.publicKeys.toArray();

	console.log('fetch collectible of all keys', keys);
	return [];
};
