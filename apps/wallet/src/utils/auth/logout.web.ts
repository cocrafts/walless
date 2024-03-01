import { signOut } from '@firebase/auth';
import { getDefaultEngine } from 'engine';

import { auth } from '../firebase/index.web';
import { storage } from '../storage';

export const logout = async () => {
	await signOut(auth());
	const engine = getDefaultEngine();
	await engine.clear();
	await storage.clearAllDocs();
};
