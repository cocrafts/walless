import Config from 'react-native-config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CustomAuth } from '@toruslabs/customauth-react-native-sdk';

import { auth } from './../firebase';
import { customAuthArgs } from './w3a';

GoogleSignin.configure({
	webClientId: Config.GOOGLE_SIGNIN_CLIENT_ID,
	offlineAccess: true,
});

export const signInWithGoogle = async () => {
	const redirectUri = 'metacraft://walless/auth';
	await CustomAuth.init({ redirectUri, network: customAuthArgs.network });
	await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
	const { idToken } = await GoogleSignin.signIn();
	const credential = auth.GoogleAuthProvider.credential(idToken);
	const { user } = await auth().signInWithCredential(credential);

	return user;
};
