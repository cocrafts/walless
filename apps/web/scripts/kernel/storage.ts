import { createEncryptionKeyVault } from '@walless/messaging';
import { create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

export const db = create('engine', IDBPouch);
export const encryptionKeyVault = createEncryptionKeyVault(db);
