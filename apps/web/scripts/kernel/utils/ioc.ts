import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

import { makeConfig } from './config';
import { qlClient } from './graphql';

export const injectModules = async () => {
	const storage = create('engine', IDBPouch);

	modules.config = makeConfig() as never;
	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);
	await Promise.all([configure(modules.storage)]);
	modules.engine = await createEngine();

	return modules;
};

export default modules;
