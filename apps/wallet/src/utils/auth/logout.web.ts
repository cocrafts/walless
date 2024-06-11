import { signOut } from '@firebase/auth';
import { engine } from 'engine';
import { appActions } from 'state/app';

import { auth } from '../firebase/index.web';
import { storage } from '../storage';

import { tkey } from './w3a';

export const logout = async () => {
	await signOut(auth());
	await engine.clear();
	await storage.clearAllDocs();
	appActions.cleanupAfterLogOut();
	tkey.shares = {};
};
