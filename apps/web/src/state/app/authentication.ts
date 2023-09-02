import {
	makeProfile,
	NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE,
	setProfile,
	ThresholdResult,
} from '@walless/auth';
import { runtime } from '@walless/core';
import { appState } from '@walless/engine';
import type { WalletInvitation } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { User } from 'firebase/auth';
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
} from 'firebase/auth';
import {
	initAndRegisterWallet,
	initBySeedPhraseModule,
} from 'utils/authentication';
import { auth, googleProvider } from 'utils/firebase';
import { qlClient } from 'utils/graphql';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';
import { customAuth, importAvailableShares, key } from 'utils/w3a';

export const signInWithGoogle = async (invitationCode?: string) => {
	try {
		await key.serviceProvider.init({ skipSw: true, skipPrefetch: true });
		appState.authenticationLoading = true;

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

		/* for Development mode, there is no invitation required - just let them in */
		if (__DEV__) {
			await createKeyAndEnter();
		} else {
			const { walletInvitation } = await qlClient.request<{
				walletInvitation: WalletInvitation;
			}>(queries.walletInvitation, {
				email: auth.currentUser?.email,
			});

			if (!walletInvitation && invitationCode) {
				await qlClient.request(mutations.claimWalletInvitation, {
					code: invitationCode || appState.invitationCode,
					email: auth.currentUser?.email,
				});
				await createKeyAndEnter();
			} else if (!walletInvitation && !invitationCode) {
				appState.isAbleToSignIn = false;
				appState.signInError =
					'The account does not exist. Enter your Invitation code';
			} else {
				await createKeyAndEnter();
			}
		}
	} finally {
		appState.authenticationLoading = false;
	}
};

export const createKeyAndEnter = async () => {
	const user = auth.currentUser as User;
	const verifierToken = await user.getIdToken(true);
	const verifier = WEB3AUTH_ID;
	const verifierId = user.uid;
	const verifierParams = { verifier_id: user.uid };
	const loginDetails = await customAuth.getTorusKey(
		verifier,
		verifierId,
		verifierParams,
		verifierToken,
	);

	key.serviceProvider.postboxKey = loginDetails.privateKey as never;

	/* eslint-disable */
	(key.serviceProvider as any).verifierName = verifier;
	(key.serviceProvider as any).verifierId = verifierId;
	/* eslint-enable */

	await key.initialize();
	const status = await importAvailableShares();

	if (status === ThresholdResult.Initializing) {
		const registeredAccount = await initAndRegisterWallet();

		if (registeredAccount?.identifier) {
			router.navigate('/create-passcode');
		} else {
			showError('Something went wrong');
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
			router.navigate('/recovery');
		} else {
			router.navigate('/deprecated-passcode');
		}
	} else if (status === ThresholdResult.Ready) {
		await setProfile(makeProfile({ user } as never));
		await router.navigate('/');
	}
};

export const initLocalDeviceByPasscodeAndSync = async (
	passcode: string,
): Promise<void> => {
	await key.reconstructKey();

	if (auth.currentUser) {
		await setProfile(makeProfile({ user: auth.currentUser } as never));
	}

	// await initByPrivateKeyModule(passcode);
	await initBySeedPhraseModule(passcode);
	await key.syncLocalMetadataTransitions();

	modules.engine.start();
};

const getGoogleAuthURL = () => {
	const redirectURL = chrome.identity.getRedirectURL();
	const scopes = ['openid', 'email', 'profile'];
	let authURL = 'https://accounts.google.com/o/oauth2/auth';
	authURL += `?client_id=${BROWSER_CLIENT_ID}`;
	authURL += `&response_type=token`;
	authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
	authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

	return authURL;
};
