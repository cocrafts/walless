import type { User } from '@firebase/auth';
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithPopup,
} from '@firebase/auth';
import { makeProfile, setProfile, signInWithTorusKey } from '@walless/auth';
import { logger, runtime } from '@walless/core';
import { appState } from '@walless/engine';
import { mutations, queries, type WalletInvitation } from '@walless/graphql';
import { auth, googleProvider } from 'utils/firebase/index.web';
import { qlClient } from 'utils/graphql';
import { navigate } from 'utils/navigation';
import {
	customAuth,
	customAuthArgs,
	getGoogleAuthURL,
	key,
} from 'utils/w3a/index.ext';

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
			await signInWithCredential(auth(), credential);
		} else {
			await signInWithPopup(auth(), googleProvider);
		}

		if (!__DEV__) {
			const { walletInvitation } = await qlClient.request<{
				walletInvitation: WalletInvitation;
			}>(queries.walletInvitation, {
				email: auth().currentUser?.email,
			});

			if (!walletInvitation && invitationCode) {
				await qlClient.request(mutations.claimWalletInvitation, {
					code: invitationCode || appState.invitationCode,
					email: auth().currentUser?.email,
				});
			} else if (!walletInvitation && !invitationCode) {
				appState.isAbleToSignIn = false;
				appState.authenticationLoading = false;
				logger.error('The account does not exist. Enter your Invitation code');
				navigate('Authentication', { screen: 'Invitation' });
				// router.navigate('/invitation', { replace: true });
				return;
			}
		}

		const user = auth().currentUser as User;
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
			handlePasscode: async () => {
				navigate('Authentication', { screen: 'CreatePasscode' });
				// router.navigate('/create-passcode', { replace: true });
			},
			handleRecovery: async () => {
				navigate('Authentication', { screen: 'Recovery' });
				// router.navigate('/recovery', { replace: true });
			},
			handleDeprecatedPasscode: async () => {
				navigate('Authentication', { screen: 'DeprecatedPasscode' });
				// router.navigate('/deprecated-passcode');
			},
			handleReady: async () => {
				await setProfile(makeProfile(user));
				navigate('Dashboard');
				// await router.navigate('/', { replace: true });
			},
			handleError: async () => logger.error('Something went wrong') as never,
		});
	} catch (error) {
		logger.error('Error during sign-in', error);
	} finally {
		appState.authenticationLoading = false;
	}
};