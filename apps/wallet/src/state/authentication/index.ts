import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import { makeProfile, setProfile, signInWithTorusKey } from 'utils/auth';
import { logger } from '@walless/core';
import { appState } from '@walless/engine';
import type { WalletInvitation } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import { showError } from 'modals/Error';
import { qlClient } from 'utils/graphql';
import { navigate } from 'utils/navigation';
import { customAuthArgs } from 'utils/w3a';

GoogleSignin.configure({
	webClientId: Config.GOOGLE_SIGNIN_CLIENT_ID,
	offlineAccess: true,
});

export const signInWithGoogle = async (invitationCode?: string) => {
	try {
		appState.authenticationLoading = true;
		const redirectUri = 'metacraft://walless/auth';
		await CustomAuth.init({ redirectUri, network: customAuthArgs.network });
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		const { idToken } = await GoogleSignin.signIn();
		const credential = auth.GoogleAuthProvider.credential(idToken);
		const { user } = await auth().signInWithCredential(credential);

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
				showError({
					errorText: 'The account does not exist. Enter your Invitation code',
				});

				appState.isAbleToSignIn = false;
				appState.authenticationLoading = false;
				navigate('Authentication', { screen: 'Invitation' });
				return;
			}
		}

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
			handlePasscode: async () => {
				navigate('Authentication', { screen: 'CreatePasscode' });
			},
			handleRecovery: async () => {
				navigate('Authentication', { screen: 'Recovery' });
			},
			handleDeprecatedPasscode: async () => {
				navigate('Authentication', { screen: 'DeprecatedPasscode' });
			},
			handleReady: async () => {
				await setProfile(makeProfile(user));
				navigate('Dashboard');
			},
			handleError: async () => {
				showError({ errorText: 'Something went wrong' }) as never;
			},
		});
	} catch (error) {
		logger.error('Error during sign-in', error);
	} finally {
		appState.authenticationLoading = false;
	}
};
