import { create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

export const storage = create('engine', IDBPouch);
