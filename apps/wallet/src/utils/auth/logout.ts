import { firebase } from '@react-native-firebase/auth';

import { storage } from '../storage';

export const logout = async () => {
	await firebase.auth().signOut();
	await storage.clearAllDocs();
};
