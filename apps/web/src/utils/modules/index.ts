import { modules } from '@walless/app';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

export const injectModules = async () => {
	const configurePromise = [];

	modules.storage = create('engine', IDBPouch);
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);
	configurePromise.push(configure(modules.storage));

	return modules;
};

export default modules;
