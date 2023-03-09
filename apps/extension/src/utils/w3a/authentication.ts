import { TorusLoginResponse } from '@toruslabs/customauth';

import { key, TypedThresholdKey } from './internal';

export const googleSignIn = async (): Promise<TorusLoginResponse> => {
	if (!key.serviceProvider.directWeb.isInitialized) {
		await key.serviceProvider.init({ skipSw: true });
	}

	return await key.serviceProvider.triggerLogin({
		typeOfLogin: 'google',
		verifier: 'stormgate-w3a-google',
		clientId:
			'995579267000-3lo2r1psl6ovg5fek5h2329qtjl5u8fp.apps.googleusercontent.com',
	});
};

export const restructKeyInstance = async (): Promise<TypedThresholdKey> => {
	await key.initialize();
	const detail = await key.getKeyDetails();

	console.log(detail.requiredShares);

	return key;
};
