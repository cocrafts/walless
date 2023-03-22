import { Dexie } from 'dexie';

import { WallessDB } from './types';

const runMigrations = (instance: Dexie): Dexie => {
	instance.version(1).stores({
		settings: '++id, version',
		publicKeys: 'id, network',
		privateKeys: 'id, type, iv, salt, ct, mac',
		encryptionKeys: 'id, jwk, keyParams, keyUsages',
		collectibles: 'id, collectionId, metadata',
	});

	return instance;
};

export const createStorage = (name = 'walless'): WallessDB => {
	const instance = runMigrations(new Dexie(name));

	return {
		instance,
		settings: instance.table('settings'),
		publicKeys: instance.table('publicKeys'),
		privateKeys: instance.table('privateKeys'),
		encryptionKeys: instance.table('encryptionKeys'),
		collectibles: instance.table('collectibles'),
	};
};
