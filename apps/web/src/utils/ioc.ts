import { createEngine } from '@walless/engine';
import { qlInternals } from '@walless/graphql';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';
import { auth } from 'utils/firebase';

export const injectModules = async () => {
	qlInternals.makeHeaders = async () => {
		const jwt = await auth.currentUser?.getIdToken();

		return {
			Authorization: `Bearer ${jwt}`,
		};
	};

	modules.storage = create('engine', IDBPouch);
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await Promise.all([configure(modules.storage)]);

	modules.engine = await createEngine(modules.storage);
	modules.engine.start();

	return modules;
};

export default modules;
