import { createEngine } from '@walless/engine';
import { modules, utils } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import type { SettingDocument } from '@walless/store';
import { configure, create } from '@walless/store';
import { signOut } from 'firebase/auth';
import IDBPouch from 'pouchdb-adapter-idb';
import { auth, initializeAuth } from 'utils/firebase';

import { makeConfig } from '../../scripts/kernel/utils/config';

import { webAsset } from './config';
import { buyToken } from './gatefi';
import { qlClient } from './graphql';
import { router } from './routing';
import { createAndSend, handleAptosOnChainAction } from './transaction';
import { key } from './w3a';

export const injectModules = async () => {
	utils.createAndSend = createAndSend;
	utils.handleAptosFunction = handleAptosOnChainAction;
	utils.buyToken = buyToken;
	utils.logOut = logOut;
	utils.navigateToWidget = navigateToWidget;

	const storage = create('engine', IDBPouch);
	const settings = await storage.safeGet<SettingDocument>('settings');

	modules.config = makeConfig() as never;
	modules.asset = webAsset;
	modules.storage = storage;
	modules.qlClient = qlClient;
	modules.thresholdKey = key as never;
	modules.encryptionKeyVault = createEncryptionKeyVault(modules.storage);
	await Promise.all([initializeAuth(settings), configure(modules.storage)]);
	modules.engine = await createEngine();
	modules.engine.start();

	return modules;
};

export default modules;

const logOut = async () => {
	await signOut(auth);
	await modules.storage.clearAllDocs();
	await router.navigate('/login');
};

const navigateToWidget = (id: string) => {
	router.navigate(id);
};
