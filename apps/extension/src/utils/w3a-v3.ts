import { BNString } from '@tkey/common-types';
import { TorusLoginResponse } from '@toruslabs/customauth';

import { key } from './tkey';

export enum tKeySignal {
	REQUIRE_INIT_PASSCODE,
	REQUIRE_INPUT_PASSCODE,
	WRONG_PASSCODE,
	INPUT_PASSCODE_SUCCESS,
	INIT_PASSCODE_SUCCESS,
	INIT_PASSCODE_FAIL,
	RECONSTRUCT_KEY_SUCCESS,
}

/**
 * This method return temporary share from anywhere
 * If temporary share was expired, release it and return null
 * */
export const getTemporaryShare = () => {
	return null;
};

/**
 * This method return private key if it exits a share in storage
 * add temporaryShare is valid
 * */
export const getKeyFromStart = (temporaryShare: BNString) => {
	// If storage was found and temporary share is valid
	// todo: reconstruct private key and return it
	// If storage was found and temporary share was expired
	// todo: require passcode from user
	console.log(temporaryShare);
	return null;
};

/**
 * This method return private key if it exits a share in storage
 * and passcode parameter is valid
 * */
export const inputPasscode = async (passcode: string) => {
	try {
		await key.modules.securityQuestions.inputShareFromSecurityQuestions(
			passcode,
		);
	} catch (e) {
		console.log(e);
		return tKeySignal.WRONG_PASSCODE;
	}
	return tKeySignal.INPUT_PASSCODE_SUCCESS;
};

export const googleSignIn = async (): Promise<TorusLoginResponse> => {
	const { serviceProvider } = key;

	if (!serviceProvider.directWeb.isInitialized) {
		await serviceProvider.init({ skipSw: true });
	}

	const response = await serviceProvider.triggerLogin({
		typeOfLogin: 'google',
		verifier: 'walless-gc',
		clientId: GOOGLE_CLIENT_ID,
	});

	return response;
};

/**
 * This method return private key.
 * Just call it after trigger login
 * */
export const initAfterLogin = async () => {
	// If this is the first time login
	const { requiredShares } = key.getKeyDetails();
	if (requiredShares > 0) {
		return tKeySignal.REQUIRE_INIT_PASSCODE;
	}
	// If storage share was found
	try {
		await key.modules.webStorage.inputShareFromWebStorage();
		await key.reconstructKey();

		return tKeySignal.RECONSTRUCT_KEY_SUCCESS;
	} catch (e) {
		console.log(e);
	}
	// If storage share wasn't found (loss or in new browser/ device)
	return tKeySignal.REQUIRE_INPUT_PASSCODE;
};

export const initPasscode = async (passcode: string) => {
	try {
		await key.modules.securityQuestions.generateNewShareWithSecurityQuestions(
			passcode,
			'whats your passcode',
		);

		await key.modules.securityQuestions.inputShareFromSecurityQuestions(
			passcode,
		);

		// Reconstruct key after fetch 2/3 flow (google share and passcode share)
		await key.reconstructKey();

		// Create new share for current user
		const shareStore = await key.generateNewShare();

		// Store share into web storage
		await key.modules.webStorage.storeDeviceShare(shareStore.newShareStores[1]);

		return tKeySignal.INIT_PASSCODE_SUCCESS;
	} catch (e) {
		console.log(e);
		return tKeySignal.INIT_PASSCODE_FAIL;
	}
};
