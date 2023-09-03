import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

import { qlClient } from './graphql';

export const injectModules = async () => {
	const storage = create('engine', IDBPouch);

	modules.config = {
		FIREBASE_API_KEY,
		BUILD_TARGET,
		BROWSER_CLIENT_ID,
		EXTENSION_CLIENT_ID,
		FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID,
		FIREBASE_MEASUREMENT_ID,
		WEB3AUTH_ID,
		GRAPHQL_ENDPOINT,
		PIXEVERSE_ENDPOINT,
		PIXEVERSE_ORIGIN,
		PIXEVERSE_URL,
		SOLANA_CLUSTER_URL,
	};

	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await Promise.all([configure(modules.storage)]);
	modules.engine = await createEngine();

	return modules;
};

export default modules;
