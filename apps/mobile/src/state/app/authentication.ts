import { Platform } from 'react-native';
import Config from 'react-native-config';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import { appState, recoverByEmergencyKey } from '@walless/app';
import { customAuthArgs, key } from 'utils/w3a';

GoogleSignin.configure({
	webClientId: Platform.select({
		android: Config.GOOGLE_CLIENT_ID_ANDROID,
		default: Config.GOOGLE_CLIENT_ID_IOS,
	}),
});

export const signInWithGoogle = async () => {
	try {
		appState.authenticationLoading = true;

		const redirectUri = 'metacraft://walless/auth';
		await CustomAuth.init({ redirectUri, network: customAuthArgs.network });
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		const { idToken } = await GoogleSignin.signIn();
		const credential = auth.GoogleAuthProvider.credential(idToken);
		const { user } = await auth().signInWithCredential(credential);

		await createKeyAndEnter(user);
	} catch (e) {
		console.log(e);
	} finally {
		appState.authenticationLoading = false;
	}
};

const createKeyAndEnter = async (user: FirebaseAuthTypes.User) => {
	const verifierToken = await user.getIdToken(true);
	const verifier = customAuthArgs.web3AuthClientId;
	const verifierId = user.uid;
	const verifierParams = { verifierIdField: 'sub', verifier_id: user.uid };
	const loginDetails = await CustomAuth.getTorusKey(
		verifier,
		verifierId,
		verifierParams,
		verifierToken,
	);

	key.serviceProvider.postboxKey = loginDetails.privateKey as never;
	await key.initialize();
	console.log(key.getKeyDetails(), '<-- key details');
};
