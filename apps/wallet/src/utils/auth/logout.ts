import { firebase } from '@react-native-firebase/auth';
import { getDefaultEngine } from 'engine';

import { storage } from '../storage';

export const logout = async () => {
	await firebase.auth().signOut();
	const engine = getDefaultEngine();
	await engine.clear();
	await storage.clearAllDocs();
};
