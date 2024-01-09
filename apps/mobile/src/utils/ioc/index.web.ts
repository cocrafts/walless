import { signOut } from '@firebase/auth';
import { buyToken } from '@walless/app';
import { logger } from '@walless/core';
import { createEngine } from '@walless/engine';
import { modules, utils } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import IDBPouch from 'pouchdb-adapter-idb';

import { environment } from '../config';
import { configureDeviceAndNotification } from '../device/device.web';
import { appAnalytics, auth, initializeAuth } from '../firebase/index.web';
import { qlClient } from '../graphql';
import { nativeModules } from '../native';
import { navigate, navigationRef } from '../navigation';
import { createAndSend, handleAptosOnChainAction } from '../transaction';
import { key } from '../w3a';

export const injectModules = async () => {
	const startTime = new Date();
	const storage = create('engine', IDBPouch);

	utils.createAndSend = createAndSend;
	utils.handleAptosFunction = handleAptosOnChainAction;
	utils.buyToken = buyToken;
	utils.logOut = logOut;
	utils.navigateToWidget = navigateToWidget;
	utils.navigateToCollection = navigateToCollection;
	utils.navigateToCollectible = navigateToCollectible;
	utils.navigateBack = navigateBack;

	modules.native = nativeModules;
	modules.analytics = appAnalytics;
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

const navigateToWidget = (id: string) => {
	navigate('Dashboard', {
		screen: 'Explore',
		params: { screen: 'Widget', params: { id } },
	});
};

const navigateToCollection = (id: string) => {
	navigate('Dashboard', {
		screen: 'Explore',
		params: { screen: 'Collection', params: { id } },
	});
};

const navigateToCollectible = (id: string) => {
	navigate('Dashboard', {
		screen: 'Explore',
		params: { screen: 'Collectible', params: { id } },
	});
};

const navigateBack = () => {
	navigationRef.goBack();
};
