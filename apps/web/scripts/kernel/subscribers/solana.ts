import { AccountChangeCallback, PublicKey } from '@solana/web3.js';
import { PublicKeyDocument } from '@walless/store';
import { db } from 'utils/pouch';

import { solanaConnection } from '../utils/connection';
import { solanaKeysSelector } from '../utils/pouchSelectors';

const subscriptionMap: Record<string, number> = {};

export const subscribeSolanaChanges = async () => {
	const result = await db.find(solanaKeysSelector);
	const keys = result.docs as PublicKeyDocument[];

	for (const key of keys) {
		const publicKey = new PublicKey(key._id);
		const existingChangeId = subscriptionMap[key._id];

		if (!existingChangeId) {
			subscriptionMap[key._id] = solanaConnection.onAccountChange(
				publicKey,
				handleAccountChange,
			);
		}
	}
};

export const clearSolanaSubscriptions = async () => {
	const removePromises = [];

	for (const key in subscriptionMap) {
		const changeId = subscriptionMap[key];

		removePromises.push(solanaConnection.removeAccountChangeListener(changeId));
		delete subscriptionMap[key];
	}

	await Promise.all(removePromises);
};

const handleAccountChange: AccountChangeCallback = async ({ data, owner }) => {
	const key = owner.toString();

	console.log(data, owner, key, '<--');
	await db.upsert(key, (doc) => {
		return { ...doc } as never;
	});
};
