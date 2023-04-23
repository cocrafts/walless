import { Networks } from '@walless/core';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

export const db = create('engine', IDBPouch);

export const initializeStorage = async () => {
	await configure(db);
};

export default db;

export const selectors = {
	allExtensions: { selector: { type: 'Extension' } },
	allKeys: { selector: { type: 'PublicKey' } },
	solanaKeys: { selector: { type: 'PublicKey', network: Networks.solana } },
	allTokens: { selector: { type: 'Token' } },
};
