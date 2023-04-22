import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

export const db = create('engine', IDBPouch);

export const initializeStorage = async () => {
	await configure(db);
};

export default db;
