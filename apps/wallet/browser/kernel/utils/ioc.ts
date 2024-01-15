import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

import { makeConfig } from './config';
import { qlClient } from './graphql';

export const injectModules = async () => {
	if (!modules.storage) {
		const storage = create('engine', IDBPouch);
		modules.storage = storage;
	}

	if (!modules.qlClient) {
		modules.qlClient = qlClient;
	}

	modules.config = makeConfig() as never;
	await Promise.all([configure(modules.storage)]);

	if (!modules.engine) {
		modules.engine = await createEngine();
		modules.engine.start();
	}

	return modules;
};

export default modules;
