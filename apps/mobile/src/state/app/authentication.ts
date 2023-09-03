import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import {
	initBySeedPhraseModule,
	makeProfile,
	setProfile,
	signInWithTorusKey,
} from '@walless/auth';
import { appState } from '@walless/engine';
import { modules } from '@walless/ioc';
import { navigate } from 'utils/navigation';
import { customAuthArgs, key } from 'utils/w3a';

GoogleSignin.configure({
	webClientId: Config.GOOGLE_SIGNIN_CLIENT_ID,
	offlineAccess: true,
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

		await signInWithTorusKey({
			verifier,
			verifierId,
			privateKey: loginDetails.privateKey as string,
			handlePasscode: async () => navigate('CreatePasscode'),
			handleRecovery: async () => navigate('Recovery'),
			handleDeprecatedPasscode: async () => navigate('DeprecatedPasscode'),
			handleReady: async () => {
				await setProfile(makeProfile({ user } as never));
				navigate('Dashboard');
			},
			handleError: async () => {
				console.log('something went wrong during register wallet');
			},
		});
	} catch (error) {
		console.log('error during sign-in', error);
	} finally {
		appState.authenticationLoading = false;
	}
};

export const initLocalDeviceByPasscodeAndSync = async (
	passcode: string,
): Promise<void> => {
	if (auth().currentUser) {
		const profile = makeProfile({ user: auth().currentUser } as never);
		await setProfile(profile);
	}

	await key.reconstructKey();
	await initBySeedPhraseModule(passcode);
	// await key.syncLocalMetadataTransitions();
	modules.engine.start();
};
