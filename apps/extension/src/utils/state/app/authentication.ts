import { SubVerifierDetails, TorusLoginResponse } from '@toruslabs/customauth';
import { UserProfile } from '@walless/storage';
import { db } from 'kernel/utils/alias';
import { hashRouter } from 'utils/router';
import {
	configureSecurityQuestionShare,
	importAvailableShares,
	key,
	recoverDeviceShare,
	ThresholdResult,
} from 'utils/w3a';

import { appState } from './internal';

interface InternalCache {
	loginResponse?: TorusLoginResponse;
}

const cache: InternalCache = {};

const makeProfile = ({
	publicAddress,
	userInfo,
}: TorusLoginResponse): UserProfile => {
	return {
		id: publicAddress,
		email: userInfo.email,
		name: userInfo.name,
		profileImage: userInfo.profileImage,
	};
};

export const setProfile = async (profile: UserProfile): Promise<void> => {
	appState.profile = profile;
	await db.settings.put({
		id: 1,
		version: '0.0.1',
		profile,
	});
};

export const signInGoogle = async () => {
	const loginParams: SubVerifierDetails = {
		typeOfLogin: 'google',
		verifier: 'walless001',
		clientId: GOOGLE_CLIENT_ID,
	};

	try {
		appState.authenticationLoading = true;

		await key.serviceProvider.init({ skipSw: true });
		cache.loginResponse = await key.serviceProvider.triggerLogin(loginParams);
		await key.initialize();
		const status = await importAvailableShares();

		if (status === ThresholdResult.Initializing) {
			await hashRouter.navigate('/passcode');
		} else if (status === ThresholdResult.Missing) {
			await hashRouter.navigate('/enter-passcode');
		} else if (status === ThresholdResult.Ready) {
			await setProfile(makeProfile(cache.loginResponse));
			await hashRouter.navigate('/explore');
		}
	} finally {
		appState.authenticationLoading = false;
	}
};

export const confirmPasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);

	if (cache.loginResponse) {
		await setProfile(makeProfile(cache.loginResponse));
	}

	await hashRouter.navigate('/');
};

export const recoverWithPasscode = async (passcode: string) => {
	appState.passcodeLoading = true;
	appState.passcodeError = undefined;

	const unlockSuccess = await recoverDeviceShare(passcode);

	if (unlockSuccess) {
		if (cache.loginResponse) {
			await setProfile(makeProfile(cache.loginResponse));
		}

		await hashRouter.navigate('/explore');
	} else {
		appState.passcodeError = 'wrong passcode, please try again!';
	}

	appState.passcodeLoading = false;
};
