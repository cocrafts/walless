import { SubVerifierDetails, TorusLoginResponse } from '@toruslabs/customauth';
import { UserProfile } from '@walless/storage';
import { db } from 'kernel/utils/alias';
import { hashRouter } from 'utils/router';
import {
	configureSecurityQuestionShare,
	importAvailableShares,
	key,
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
		appState.authLoading = true;

		await key.serviceProvider.init({ skipSw: true });
		cache.loginResponse = await key.serviceProvider.triggerLogin(loginParams);
		await key.initialize();
		const status = await importAvailableShares();
		await key.modules.webStorage?.inputShareFromWebStorage();

		if (status === ThresholdResult.Initializing) {
			await hashRouter.navigate('/passcode');
		} else if (status === ThresholdResult.Missing) {
			await hashRouter.navigate('/passcode');
		} else if (status === ThresholdResult.Ready) {
			await setProfile(makeProfile(cache.loginResponse));
			await hashRouter.navigate('/explore');
		}
	} finally {
		appState.authLoading = false;
	}
};

export const confirmPasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);

	if (cache.loginResponse) {
		await setProfile(makeProfile(cache.loginResponse));
	}

	await hashRouter.navigate('/');
};
