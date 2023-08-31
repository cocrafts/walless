import WebSQLite from 'react-native-quick-websql';
// import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

import { initializeAuth } from './firebase';

export const injectModules = async () => {
	const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite);
	const storage = create('engine', SQLiteAdapter);

	modules.storage = storage;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await Promise.all([initializeAuth(), configure(modules.storage)]);
	// modules.engine = await createEngine({ storage, qlClient });
	// modules.engine.start();

	return modules;
};

export default modules;
