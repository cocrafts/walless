import { signOut } from '@firebase/auth';
import { logger } from '@walless/core';
import { createEngine } from '@walless/engine';
import { modules, utils } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

import { environment } from '../config';
import { configureDeviceAndNotification } from '../device/device.web';
import { auth, initializeAuth } from '../firebase/index.web';
import { qlClient } from '../graphql';
import { key } from '../w3a';

export const injectModules = async () => {
	const startTime = new Date();
	const storage = create('engine', IDBPouch);

	utils.logOut = logOut;

	modules.config = environment;
	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.thresholdKey = key as never;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await configure(storage); // pouchdb setup, should be lighting fast
	await initializeAuth(); // some of its dependency triggered without await causing fast complete/resolve
	modules.engine = await createEngine(); // start crawling engine
	modules.engine.start();

	configureDeviceAndNotification(); // asynchornous, should cost nothing evaluate/run

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.info(`Configured IoC module in ${milliseconds}ms`);

	return modules;
};

export default modules;

const logOut = async () => {
	await signOut(auth());
	await modules.storage.clearAllDocs();
};
