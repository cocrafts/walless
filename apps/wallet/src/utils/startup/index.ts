import { logger } from '@walless/core';
import { createEngine } from '@walless/engine';
import { modules } from '@walless/ioc';
import { createEncryptionKeyVault } from '@walless/messaging';
import { configure } from '@walless/store';
import { storage } from 'utils/storage';

import { initializeAuth } from '../firebase';

export const initializeApp = async () => {
	const startTime = new Date();

	modules.storage = storage;
	modules.encryptionKeyVault = createEncryptionKeyVault(storage);

	await configure(storage);
	await initializeAuth();
	modules.engine = await createEngine();
	modules.engine.start();

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.debug(`Started up in ${milliseconds}ms`);

	return modules;
};

export default modules;
