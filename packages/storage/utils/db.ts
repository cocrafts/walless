import { Dexie } from 'dexie';

import { WallessDB } from './types';

const runMigrations = (instance: Dexie): Dexie => {
	instance.version(1).stores({
		settings: '++id, version',
		keys: '++id, address, iv, salt, ct, mac',
	});

	return instance;
};

export const createStorage = (name = 'walless'): WallessDB => {
	const instance = runMigrations(new Dexie(name));

	return {
		instance,
		settings: instance.table('settings'),
		keys: instance.table('keys'),
	};
};
