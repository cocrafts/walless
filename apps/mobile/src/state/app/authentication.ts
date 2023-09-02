import { Platform } from 'react-native';
import Config from 'react-native-config';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import { appState } from '@walless/app';
import {
	getSharesStatus,
	initAndRegisterWallet,
	initBySeedPhraseModule,
	makeProfile,
	NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE,
	setProfile,
	ThresholdResult,
} from '@walless/auth';
import { modules } from '@walless/ioc';
import { navigate } from 'utils/navigation';
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
	console.log(getSharesStatus);
	const status = await getSharesStatus();

	if (status === ThresholdResult.Initializing) {
		console.log('initializing account (first time)');
		const registeredAccount = await initAndRegisterWallet();
		console.log('here', registeredAccount);
		if (registeredAccount?.identifier) {
			console.log('navigate to create passcode');
			navigate('CreatePasscode');
		} else {
			// showError('Something went wrong');
			console.log('something went wrong');
		}
	} else if (status === ThresholdResult.Missing) {
		let isLegacyAccount = false;
		try {
			isLegacyAccount =
				key.modules.securityQuestions.getSecurityQuestions() ===
				'universal-passcode';
		} catch (e) {
			console.log(e);
		}

		const wasMigrated =
			key.getKeyDetails().totalShares >
			NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE;
		const isRecovery = !isLegacyAccount || wasMigrated;

		if (isRecovery) {
			navigate('Recovery');
		} else {
			navigate('DeprecatedPasscode');
			console.log('using deprecated passcode');
		}
	} else if (status === ThresholdResult.Ready) {
		console.log('ready to continue');
		await setProfile(makeProfile({ user } as never));
		navigate('Dashboard');
	}
};

export const initLocalDeviceByPasscodeAndSync = async (
	passcode: string,
): Promise<void> => {
	await key.reconstructKey();

	if (auth().currentUser) {
		await setProfile(makeProfile({ user: auth().currentUser } as never));
	}

	// await initByPrivateKeyModule(passcode);
	await initBySeedPhraseModule(passcode);
	// await key.syncLocalMetadataTransitions();

	modules.engine.start();
};
