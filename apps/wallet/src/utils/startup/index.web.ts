import { logger } from '@walless/core';
import { modules } from '@walless/ioc';
import { configure } from '@walless/store';
import { storage } from 'utils/storage';

import { configureDeviceAndNotification } from '../device/device.web';
import { initializeAuth } from '../firebase/index.web';

export const initializeApp = async () => {
	const startTime = new Date();

	modules.storage = storage;

	await configure(storage); // pouchdb setup, should be lighting fast
	await initializeAuth(); // some of its dependency triggered without await causing fast complete/resolve

	configureDeviceAndNotification(); // asynchronous, should cost nothing evaluate/run

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.info(`Started up in ${milliseconds}ms`);

	return modules;
};

export default modules;
