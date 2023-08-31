import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

import { qlClient } from './graphql';

export const injectModules = async () => {
	const storage = create('engine', IDBPouch);
	modules.storage = storage;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await Promise.all([configure(modules.storage)]);
	modules.engine = await createEngine({ storage, qlClient });

	return modules;
};

export default modules;
