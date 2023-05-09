import { getSuiTokensByAddress } from '@walless/network';
import { PublicKeyDocument } from '@walless/store';
import { flatten } from 'lodash';
import { db, selectors } from 'utils/pouch';

import { provider } from '../utils/sui';

export const subscribeSuiChanges = async () => {
	const result = await db.find(selectors.suiKeys);
	const keys = result.docs as PublicKeyDocument[];
	const tokenPromises = [];

	for (const key of keys) {
		tokenPromises.push(getSuiTokensByAddress(provider, key._id));
	}

	const tokenChunks = await Promise.all(tokenPromises);
	const tokenDocuments = flatten(tokenChunks);

	await Promise.all(
		tokenDocuments.map((token) => {
			return db.upsert(token._id, async () => {
				return token;
			});
		}),
	);
};

export const clearSuiSubscriptions = async () => {
	// not implemented yet
};
