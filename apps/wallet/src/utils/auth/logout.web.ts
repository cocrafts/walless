import { signOut } from '@firebase/auth';

import { auth } from '../firebase/index.web';
import { storage } from '../storage';

export const logout = async () => {
	await signOut(auth());
	await storage.clearAllDocs();
};
