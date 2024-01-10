import { logger } from '@walless/core';
import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure } from '@walless/store';
import { storage } from 'utils/storage';

import { configureDeviceAndNotification } from '../device/device.web';
import { initializeAuth } from '../firebase/index.web';

export const initializeApp = async () => {
	const startTime = new Date();

	modules.storage = storage;
	modules.encryptionKeyVault = createEncryptionKeyVault(storage);

	await configure(storage); // pouchdb setup, should be lighting fast
	await initializeAuth(); // some of its dependency triggered without await causing fast complete/resolve
	modules.engine = await createEngine(); // start crawling engine
	modules.engine.start();

	configureDeviceAndNotification(); // asynchronous, should cost nothing evaluate/run

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.info(`Started up in ${milliseconds}ms`);

	return modules;
};

export default modules;
