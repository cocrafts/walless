import { configure } from '@walless/store';

import { storage } from './storage';

export const initModules = async () => {
	await Promise.all([configure(storage)]);
};
