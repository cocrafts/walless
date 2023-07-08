import { Platform } from 'react-native';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomAuth from '@toruslabs/customauth-react-native-sdk';

GoogleSignin.configure({
	webClientId: Platform.select({
		android: Config.GOOGLE_CLIENT_ID_ANDROID,
		default: Config.GOOGLE_CLIENT_ID_IOS,
	}),
});

export const signInWithGoogle = async () => {
	await CustomAuth.init({
		redirectUri: 'metacraft://walless/auth',
		network: 'mainnet',
	});

	await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
	const { idToken } = await GoogleSignin.signIn();
	const credential = auth.GoogleAuthProvider.credential(idToken);
	const { user } = await auth().signInWithCredential(credential);
	const verifierToken = await user.getIdToken(true);
	const verifier = 'walless-jwt';
	const verifierId = user.uid;
	const verifierParams = { verifierIdField: 'sub', verifier_id: user.uid };

	try {
		const loginDetails = await CustomAuth.getTorusKey(
			verifier,
			verifierId,
			verifierParams,
			verifierToken,
		);

		console.log('login with Google.. on progress!', loginDetails);
	} catch (e) {
		console.log(e);
	}
};
