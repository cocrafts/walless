import { Dexie } from 'dexie';

import { type WallessDB } from './types';

const runMigrations = (instance: Dexie): Dexie => {
	instance.version(2).stores({
		settings: '++id, version',
		publicKeys: 'id, network',
		privateKeys: 'id, type, iv, salt, ct, mac',
		encryptionKeys: 'id, jwk, keyParams, keyUsages',
		collectibles: 'id, collectionId, metadata',
		collections: 'id, collectionMetadata',
		wallets: 'id, tokens, network',
		tokens: 'id, metadata, network',
		extensions: 'id, color, icon, type, timestamp',
		trustedDomains: 'id, domainName, trusted, timestamp, connectCount',
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
		collections: instance.table('collections'),
		wallets: instance.table('wallets'),
		tokens: instance.table('tokens'),
		extensions: instance.table('extensions'),
		trustedDomains: instance.table('trustedDomains'),
	};
};
