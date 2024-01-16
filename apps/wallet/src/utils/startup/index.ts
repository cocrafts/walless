import { logger } from '@walless/core';
import { modules } from '@walless/ioc';
import { configure } from '@walless/store';
import { storage } from 'utils/storage';

import { initializeAuth } from '../firebase';

export const initializeApp = async () => {
	const startTime = new Date();

	modules.storage = storage;

	await configure(storage);
	await initializeAuth();

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.debug(`Started up in ${milliseconds}ms`);

	return modules;
};

export default modules;
