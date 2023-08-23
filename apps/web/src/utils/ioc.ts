import { createEngine } from '@walless/engine';
import { qlInternals } from '@walless/graphql';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';
import { fireCache } from 'utils/firebase';

export const injectModules = async () => {
	qlInternals.makeHeaders = () => {
		const headers: Record<string, string> = {};

		if (fireCache.idToken) {
			headers['Authorization'] = `Bearer ${fireCache.idToken}`;
		}

		return headers;
	};

	modules.storage = create('engine', IDBPouch);
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await Promise.all([configure(modules.storage)]);

	modules.engine = await createEngine(modules.storage);
	modules.engine.start();

	return modules;
};

export default modules;
