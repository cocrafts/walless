import { makeProfile, setProfile, signInWithTorusKey } from '@walless/auth';
import { runtime } from '@walless/core';
import { appState } from '@walless/engine';
import { type WalletInvitation, mutations, queries } from '@walless/graphql';
import type { User } from 'firebase/auth';
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from 'utils/firebase';
import { qlClient } from 'utils/graphql';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';
import { customAuth, customAuthArgs, getGoogleAuthURL, key } from 'utils/w3a';

export const signInWithGoogle = async (invitationCode?: string) => {
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

		if (!__DEV__) {
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
			} else if (!walletInvitation && !invitationCode) {
				appState.isAbleToSignIn = false;
				appState.authenticationLoading = false;
				showError('The account does not exist. Enter your Invitation code');
				router.navigate('/invitation');
				return;
			}
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
