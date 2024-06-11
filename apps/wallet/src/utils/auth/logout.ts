import { firebase } from '@react-native-firebase/auth';
import { engine } from 'engine';
import { appActions } from 'state/app';

import { storage } from '../storage';

import { tkey } from './w3a';

export const logout = async () => {
	await firebase.auth().signOut();
	await engine.clear();
	await storage.clearAllDocs();
	appActions.cleanupAfterLogOut();
	tkey.shares = {};
};
