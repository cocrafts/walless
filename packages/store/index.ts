import HttpPouch from 'pouchdb-adapter-http';
import PouchDB from 'pouchdb-core';
import find from 'pouchdb-find';
import mapreduce from 'pouchdb-mapreduce';
import replication from 'pouchdb-replication';

export const create = (
	name: string,
	storageEngine: PouchDB.Plugin,
): PouchDB.Database => {
	PouchDB.plugin(HttpPouch)
		.plugin(replication)
		.plugin(mapreduce)
		.plugin(find)
		.plugin(storageEngine);

	return new PouchDB(name);
};

export const configure = async (db: PouchDB.Database): Promise<void> => {
	await db.createIndex({
		index: { fields: ['type', 'network'] },
	});
};
