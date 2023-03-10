import { TorusLoginResponse } from '@toruslabs/customauth';
import { UserProfile } from '@walless/storage';
import { hashRouter } from 'utils/router';
import { key } from 'utils/w3a';

import { appState } from './internal';

interface InternalCache {
	loginResponse?: TorusLoginResponse;
}

const cache: InternalCache = {};

export const setProfile = (profile: UserProfile) => {
	appState.profile = profile;
};

export const signInGoogle = async () => {
	appState.authLoading = true;

	if (!key.serviceProvider.directWeb.isInitialized) {
		await key.serviceProvider.init({ skipSw: true });
	}

	cache.loginResponse = await key.serviceProvider.triggerLogin({
		typeOfLogin: 'google',
		verifier: 'stormgate-w3a-google',
		clientId:
			'995579267000-3lo2r1psl6ovg5fek5h2329qtjl5u8fp.apps.googleusercontent.com',
	});

	appState.authLoading = false;

	await hashRouter.navigate('/passcode');
};

export const confirmPasscode = async (passcode: string) => {
	console.log(passcode, '<-- passcode is');
};
