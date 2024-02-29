import { signInWithPopup } from '@firebase/auth';
import { auth, googleProvider } from 'utils/firebase/index.web';

export const signInWithGoogle = async () => {
	const userCredential = await signInWithPopup(auth(), googleProvider);

	return userCredential.user;
};
