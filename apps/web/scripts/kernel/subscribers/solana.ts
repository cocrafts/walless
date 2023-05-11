import { AccountChangeCallback, PublicKey } from '@solana/web3.js';
import { getSolanaTokensByAddress } from '@walless/network';
import { PublicKeyDocument } from '@walless/store';
import { flatten } from 'lodash';
import { selectors } from 'utils/helper';
import modules from 'utils/modules';

import { solanaConnection } from '../utils/connection';
import { connection, getLazySolanaMetatadata } from '../utils/solana';

const subscriptionMap: Record<string, number> = {};

export const subscribeSolanaChanges = async () => {
	const result = await modules.storage.find(selectors.solanaKeys);
	const keys = result.docs as PublicKeyDocument[];
	const tokenPromises = [];

	for (const key of keys) {
		const publicKey = new PublicKey(key._id);
		const existingChangeId = subscriptionMap[key._id];

		if (!existingChangeId) {
			subscriptionMap[key._id] = solanaConnection.onAccountChange(
				publicKey,
				handleAccountChange,
			);
		}

		tokenPromises.push(
			getSolanaTokensByAddress(connection, key._id, getLazySolanaMetatadata),
		);
	}

	const tokenChunks = await Promise.all(tokenPromises);
	const tokenDocuments = flatten(tokenChunks);

	await Promise.all(
		tokenDocuments.map((token) => {
			return modules.storage.upsert(token._id, async () => {
				return token;
			});
		}),
	);
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
	await modules.storage.upsert(key, (doc) => {
		return { ...doc } as never;
	});
};
