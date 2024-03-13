import HttpPouch from 'pouchdb-adapter-http';
import PouchDB from 'pouchdb-core';
import find from 'pouchdb-find';
import mapreduce from 'pouchdb-mapreduce';
import replication from 'pouchdb-replication';

import type { Database } from './utils/type';
import helpers from './plugins';

const cache: { instance: Database; configured: boolean } = {} as never;
export const create = (
	name: string,
	storageEngine: PouchDB.Plugin,
): Database => {
	if (cache.instance) return cache.instance;

	PouchDB.plugin(HttpPouch)
		.plugin(replication)
		.plugin(mapreduce)
		.plugin(find)
		.plugin(helpers)
		.plugin(storageEngine);

	cache.instance = new PouchDB(name) as never;
	return cache.instance;
};

export const configure = async (db: PouchDB.Database): Promise<void> => {
	if (!cache.configured) {
		cache.configured = true;

		await db.createIndex({
			index: { fields: ['type', 'network', 'cluster'] },
		});
	}
};

export * from './migrations';
export * from './utils/helper';
export * from './utils/type';
