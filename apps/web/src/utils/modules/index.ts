import { modules } from '@walless/app';
import { createEngine } from '@walless/engine';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

export const injectModules = async () => {
	modules.storage = create('engine', IDBPouch);
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await Promise.all([configure(modules.storage)]);

	modules.engine = createEngine({
		storage: modules.storage,
		defaultEndpoint: __DEV__ ? 'devnet' : 'mainnet',
	});

	modules.engine.start();

	return modules;
};

export * from './helper';

export default modules;
