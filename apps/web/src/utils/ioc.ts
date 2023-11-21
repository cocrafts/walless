import { createEngine } from '@walless/engine';
import { modules, utils } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import { signOut } from 'firebase/auth';
import IDBPouch from 'pouchdb-adapter-idb';
import { auth, initializeAuth, universalAnalytics } from 'utils/firebase';

import { makeConfig } from '../../scripts/kernel/utils/config';

import { webAsset } from './config';
import { buyToken } from './gatefi';
import { qlClient } from './graphql';
import { router } from './routing';
import { createAndSend, handleAptosOnChainAction } from './transaction';
import { key } from './w3a';

export const injectModules = async () => {
	const startTime = new Date();
	const storage = create('engine', IDBPouch);

	utils.createAndSend = createAndSend;
	utils.handleAptosFunction = handleAptosOnChainAction;
	utils.buyToken = buyToken;
	utils.logOut = logOut;

	modules.analytics = universalAnalytics;
	modules.asset = webAsset;
	modules.config = makeConfig() as never;
	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.thresholdKey = key as never;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await configure(storage); // pouchdb setup, should be lighting fast
	await initializeAuth(); // some of its dependency triggered without await causing fast complete/resolve
	modules.engine = await createEngine(); // start crawling engine
	modules.engine.start();

	const endTime = new Date();
	const milliseconds = endTime.getMilliseconds() - startTime.getMilliseconds();
	console.log(`Took ${milliseconds} milliseconds to configure IoC module`);

	return modules;
};

export default modules;

const logOut = async () => {
	await signOut(auth);
	await modules.storage.clearAllDocs();

	router.navigate('/login');
};
