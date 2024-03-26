import { signOut } from '@firebase/auth';
import { engine } from 'engine';

import { auth } from '../firebase/index.web';
import { storage } from '../storage';

export const logout = async () => {
	await signOut(auth());
	await engine.clear();
	await storage.clearAllDocs();
};
