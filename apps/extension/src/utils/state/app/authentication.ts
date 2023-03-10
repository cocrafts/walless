import { SubVerifierDetails } from '@toruslabs/customauth';
import { UserProfile } from '@walless/storage';
import { hashRouter } from 'utils/router';
import {
	configureSecurityQuestionShare,
	createAndStoreDeviceShare,
	importDeviceShare,
	key,
} from 'utils/w3a';

import { appState } from './internal';

export const setProfile = (profile: UserProfile) => {
	appState.profile = profile;
};

export const signInGoogle = async () => {
	const loginParams: SubVerifierDetails = {
		typeOfLogin: 'google',
		verifier: 'walless-labs-google',
		clientId: GOOGLE_CLIENT_ID,
	};

	try {
		appState.authLoading = true;

		await key.serviceProvider.init({ skipSw: true });
		await key.serviceProvider.triggerLogin(loginParams);
		await key.initialize();
		const { requiredShares, totalShares } = await key.getKeyDetails();
		const isFirstSignIn = totalShares == 2 && requiredShares <= 0;

		if (isFirstSignIn) {
			await createAndStoreDeviceShare();
			await hashRouter.navigate('/passcode');
		} else {
			try {
				await importDeviceShare();
				await hashRouter.navigate('/');
			} catch (e) {
				console.log(e);
				await hashRouter.navigate('/passcode');
			}
		}
	} finally {
		appState.authLoading = false;
	}
};

export const confirmPasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);
	await hashRouter.navigate('/home');
};
