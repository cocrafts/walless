import { appleAuth } from '@invertase/react-native-apple-authentication';
import type { FirebaseUser } from 'utils/firebase';

import { auth } from './../firebase';

export const signInWithApple = async (): Promise<FirebaseUser> => {
	const appleAuthRequestResponse = await appleAuth.performRequest({
		requestedOperation: appleAuth.Operation.LOGIN,
		requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
	});
	const { identityToken: idToken, nonce } = appleAuthRequestResponse;
	const appleCredential = auth.AppleAuthProvider.credential(idToken, nonce);
	const { user } = await auth().signInWithCredential(appleCredential);

	return user;
};
