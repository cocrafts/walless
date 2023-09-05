import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';
import { initializeAuth } from 'utils/firebase';

import { makeConfig } from '../../scripts/kernel/utils/config';

import { webAsset } from './config';
import { qlClient } from './graphql';
import { key } from './w3a';

export const injectModules = async () => {
	const storage = create('engine', IDBPouch);

	modules.config = makeConfig() as never;
	modules.asset = webAsset;
	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.thresholdKey = key as never;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);
	await Promise.all([initializeAuth(), configure(modules.storage)]);
	modules.engine = await createEngine();
	modules.engine.start();

	return modules;
};

export default modules;
