import { firebase } from '@react-native-firebase/auth';
import { engine } from 'engine';
import { appActions } from 'state/app';

import { storage } from '../storage';

export const logout = async () => {
	await firebase.auth().signOut();
	await engine.clear();
	await storage.clearAllDocs();
	appActions.cleanupAfterLogOut();
};
