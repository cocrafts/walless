import {
	initBySeedPhraseModule,
	makeProfile,
	setProfile,
	signInWithTorusKey,
} from '@walless/auth';
import { runtime } from '@walless/core';
import { appState } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { User } from 'firebase/auth';
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from 'utils/firebase';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';
import { customAuth, customAuthArgs, getGoogleAuthURL, key } from 'utils/w3a';

export const signInWithGoogle = async () => {
	try {
		appState.authenticationLoading = true;
		await key.serviceProvider.init({ skipSw: true, skipPrefetch: true });

		if (runtime.isExtension) {
			const responseUrl = await chrome.identity.launchWebAuthFlow({
				interactive: true,
				url: getGoogleAuthURL(),
			});
			const queryString = responseUrl?.split('#')?.[1];
			const searchParams = new URLSearchParams(queryString);
			const token = searchParams.get('access_token');
			const credential = GoogleAuthProvider.credential(null, token);
			await signInWithCredential(auth, credential);
		} else {
			await signInWithPopup(auth, googleProvider);
		}

		const user = auth.currentUser as User;
		const verifierToken = await user.getIdToken(true);
		const verifier = customAuthArgs.web3AuthClientId;
		const verifierId = user.uid;
		const verifierParams = { verifier_id: user.uid };
		const loginDetails = await customAuth.getTorusKey(
			verifier,
			verifierId,
			verifierParams,
			verifierToken,
		);

		await signInWithTorusKey({
			verifier,
			verifierId,
			privateKey: loginDetails.privateKey,
			handlePasscode: async () => router.navigate('/create-passcode'),
			handleRecovery: async () => router.navigate('/recovery'),
			handleDeprecatedPasscode: async () => {
				router.navigate('/deprecated-passcode');
			},
			handleReady: async () => {
				await setProfile(makeProfile(user));
				await router.navigate('/');
			},
			handleError: async () => showError('Something went wrong') as never,
		});
	} catch (error) {
		console.log('error during sign-in', error);
	} finally {
		appState.authenticationLoading = true;
	}
};

export const initLocalDeviceByPasscodeAndSync = async (
	passcode: string,
): Promise<void> => {
	if (auth.currentUser) {
		const profile = makeProfile(auth.currentUser);
		await setProfile(profile);
	}

	await key.reconstructKey();
	await initBySeedPhraseModule(passcode);
	await key.syncLocalMetadataTransitions();
	modules.engine.start();
};
