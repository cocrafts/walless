import { appState, makeProfile, ThresholdResult } from '@walless/app';
import { runtime } from '@walless/core';
import type { InvitationAccount } from '@walless/graphql';
import { gotenksClient, mutations, qlClient, queries } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { User, UserCredential } from 'firebase/auth';
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
} from 'firebase/auth';
import {
	initAndSendRecoveryCode,
	initBySeedPhraseModule,
	setProfile,
} from 'utils/authentication';
import { auth, googleProvider } from 'utils/firebase';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';
import { customAuth, importAvailableShares, key } from 'utils/w3a';

interface InternalCache {
	loginResponse?: UserCredential;
}

export const cache: InternalCache = {};

const NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE = 3;

export const signInWithGoogle = async (invitationCode?: string) => {
	try {
		await key.serviceProvider.init({ skipSw: true, skipPrefetch: true });
		appState.authenticationLoading = true;

		if (runtime.isExtension) {
			const response = await chrome.identity.getAuthToken({
				interactive: true,
				scopes: ['email', 'profile'],
			});
			const credential = GoogleAuthProvider.credential(null, response.token);
			cache.loginResponse = await signInWithCredential(auth, credential);
		} else {
			cache.loginResponse = await signInWithPopup(auth, googleProvider);
		}

		gotenksClient.setHeader(
			'Authorization',
			`Bearer ${await cache.loginResponse.user.getIdToken(true)}`,
		);

		/* for Development mode, there is no invitation required - just let them in */
		if (__DEV__) {
			await createKeyAndEnter();
		} else {
			const { invitationAccount } = await qlClient.request<{
				invitationAccount: InvitationAccount;
			}>(queries.invitationAccount, {
				email: cache.loginResponse.user.email,
			});

			if (!invitationAccount && invitationCode) {
				await qlClient.request(mutations.bindInvitation, {
					code: invitationCode || appState.invitationCode,
					email: cache.loginResponse.user.email,
				});
				await createKeyAndEnter();
			} else if (!invitationAccount && !invitationCode) {
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
	const user = cache.loginResponse?.user as User;
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
		if (await initAndSendRecoveryCode()) {
			router.navigate('/create-passcode');
		} else {
			showError('Something went wrong');
		}
	} else if (status === ThresholdResult.Missing) {
		if (
			key.modules.securityQuestions.getSecurityQuestions() !==
				'universal-passcode' ||
			key.getKeyDetails().totalShares >
				NUMBER_OF_SHARES_WITH_DEPRECATED_PASSCODE
		) {
			router.navigate('/recovery');
		} else {
			router.navigate('/deprecated-passcode');
		}
	} else if (status === ThresholdResult.Ready) {
		await setProfile(makeProfile(cache.loginResponse as never));
		await router.navigate('/');
	}
};

export const initLocalDeviceByPasscodeAndSync = async (
	passcode: string,
	login?: UserCredential,
): Promise<void> => {
	await key.reconstructKey();

	login = login || cache.loginResponse;
	if (login?.user) {
		await setProfile(makeProfile(login));
	}

	// await initByPrivateKeyModule(passcode);
	await initBySeedPhraseModule(passcode);
	await key.syncLocalMetadataTransitions();

	modules.engine.start();
};
