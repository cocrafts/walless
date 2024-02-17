import {
	appleAuth,
	appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import { runtime } from '@walless/core';
import type { FirebaseUser } from 'utils/firebase';

import { auth } from './../firebase';

export const signInWithApple = async () => {
	if (runtime.isIOS) {
		return await signInWithAppleOnIOS();
	} else if (appleAuthAndroid.isSupported) {
		return await signInWithAppleOnAndroid();
	} else {
		throw new Error('Platform not supports Apple sign-in');
	}
};

export const signInWithAppleOnIOS = async (): Promise<FirebaseUser> => {
	const appleAuthRequestResponse = await appleAuth.performRequest({
		requestedOperation: appleAuth.Operation.LOGIN,
		requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
	});
	const { identityToken: idToken, nonce } = appleAuthRequestResponse;
	const appleCredential = auth.AppleAuthProvider.credential(idToken, nonce);
	const { user } = await auth().signInWithCredential(appleCredential);

	return user;
};

export const signInWithAppleOnAndroid = async (): Promise<FirebaseUser> => {
	const rawNonce = crypto.randomUUID();
	const state = crypto.randomUUID();

	appleAuthAndroid.configure({
		// The Service ID you registered with Apple
		// TODO: we should have a Config.APPLE_SIGNIN_CLIENT_ID instead
		// https://developer.apple.com/help/account/configure-app-capabilities/configure-sign-in-with-apple-for-the-web/
		clientId: 'Config.APPLE_SIGNIN_CLIENT_ID',

		// Return URL added to your Apple dev console. We intercept this redirect, but it must still match
		// the URL you provided to Apple. It can be an empty route on your backend as it's never called.
		redirectUri: 'metacraft://walless/auth',

		// The type of response requested - code, id_token, or both.
		responseType: appleAuthAndroid.ResponseType.ALL,

		// The amount of user information requested from Apple.
		scope: appleAuthAndroid.Scope.ALL,

		// Random nonce value that will be SHA256 hashed before sending to Apple.
		nonce: rawNonce,

		// Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
		state,
	});

	const { id_token: idToken, nonce } = await appleAuthAndroid.signIn();

	if (!idToken || !nonce) {
		throw new Error(
			'Found undefined idToken or nonce when sign-in with Apple on Android',
		);
	}

	const appleCredential = auth.AppleAuthProvider.credential(idToken, nonce);
	const { user } = await auth().signInWithCredential(appleCredential);

	return user;
};
