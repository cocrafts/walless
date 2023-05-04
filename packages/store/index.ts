import HttpPouch from 'pouchdb-adapter-http';
import PouchDB from 'pouchdb-core';
import find from 'pouchdb-find';
import mapreduce from 'pouchdb-mapreduce';
import replication from 'pouchdb-replication';

import helpers from './plugins';

export type Database = PouchDB.Database & typeof helpers;

export const create = (
	name: string,
	storageEngine: PouchDB.Plugin,
): Database => {
	PouchDB.plugin(HttpPouch)
		.plugin(replication)
		.plugin(mapreduce)
		.plugin(find)
		.plugin(helpers)
		.plugin(storageEngine);

	return new PouchDB(name) as never;
};

export const configure = async (db: PouchDB.Database): Promise<void> => {
	await db.createIndex({
		index: { fields: ['type', 'network'] },
	});
};

export * from './utils/type';
