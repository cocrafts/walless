import Config from 'react-native-config';
import WebSQLite from 'react-native-quick-websql';
import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

import { nativeAsset } from './config';
import { initializeAuth } from './firebase';
import { qlClient } from './graphql';
import { key } from './w3a';

export const injectModules = async () => {
	const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite);
	const storage = create('engine', SQLiteAdapter);

	modules.config = Config;
	modules.asset = nativeAsset;
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
