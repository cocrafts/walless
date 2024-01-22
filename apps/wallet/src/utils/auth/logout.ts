import { firebase } from '@react-native-firebase/auth';
import { engine } from 'engine';

import { storage } from '../storage';

export const logout = async () => {
	await firebase.auth().signOut();
	await engine.clear();
	await storage.clearAllDocs();
};
