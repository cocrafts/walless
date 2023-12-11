import Config from 'react-native-config';
import WebSQLite from 'react-native-quick-websql';
import { firebase } from '@react-native-firebase/auth';
import { buyToken } from '@walless/app';
import { logger } from '@walless/core';
import { createEngine } from '@walless/engine';
import { modules, utils } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure, create } from '@walless/store';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

import { nativeAsset } from './config';
import { initializeAuth, universalAnalytics } from './firebase';
import { qlClient } from './graphql';
import { nativeModules } from './native';
import { navigate, navigationRef } from './navigation';
import { createAndSend, handleAptosOnChainAction } from './transaction';
import { key } from './w3a';

export const injectModules = async () => {
	const startTime = new Date();
	const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite);
	const storage = create('engine', SQLiteAdapter);

	utils.buyToken = buyToken;
	utils.createAndSend = createAndSend;
	utils.handleAptosFunction = handleAptosOnChainAction;
	utils.logOut = logOut;
	utils.navigateToWidget = navigateToWidget;
	utils.navigateToCollection = navigateToCollection;
	utils.navigateToCollectible = navigateToCollectible;
	utils.navigateBack = navigateBack;

	modules.native = nativeModules;
	modules.analytics = universalAnalytics;
	modules.asset = nativeAsset;
	modules.config = Config;
	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.thresholdKey = key as never;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);

	await configure(storage); // pouchdb setup, should be lighting fast
	await initializeAuth(); // some of its dependency triggered without await causing fast complete/resolve
	modules.engine = await createEngine();
	modules.engine.start();

	const milliseconds =
		new Date().getMilliseconds() - startTime.getMilliseconds();
	logger.debug(`Configured IoC module in ${milliseconds}ms`);

	return modules;
};

export default modules;

const logOut = async () => {
	await firebase.auth().signOut();
	await modules.storage.clearAllDocs();

	navigate('Authentication', { screen: 'Login' });
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
