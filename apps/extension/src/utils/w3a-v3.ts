import { BNString } from '@tkey/common-types';
import { TorusLoginResponse } from '@toruslabs/customauth';

import { key } from './tkey';

export enum w3aSignal {
	REQUIRE_INIT_PASSCODE = 'REQUIRE_INIT_PASSCODE',
	REQUIRE_INPUT_PASSCODE = 'REQUIRE_INPUT_PASSCODE',
	WRONG_PASSCODE = 'WRONG_PASSCODE',
	INPUT_PASSCODE_SUCCESS = 'INPUT_PASSCODE_SUCCESS',
	INIT_PASSCODE_SUCCESS = 'INIT_PASSCODE_SUCCESS',
	INIT_PASSCODE_FAIL = 'INIT_PASSCODE_FAIL',
	RECONSTRUCT_KEY_SUCCESS = 'RECONSTRUCT_KEY_SUCCESS',
	TRIGGER_LOGIN_FAIL = 'TRIGGER_LOGIN_FAIL',
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
		return w3aSignal.WRONG_PASSCODE;
	}
	return w3aSignal.INPUT_PASSCODE_SUCCESS;
};

export const googleSignIn = async (): Promise<
	TorusLoginResponse | w3aSignal
> => {
	const { serviceProvider } = key;

	if (!serviceProvider.directWeb.isInitialized) {
		await serviceProvider.init({ skipSw: true });
	}

	let response = null;
	console.log('GOOGLE_CLIENT_ID: ', GOOGLE_CLIENT_ID);

	try {
		response = await serviceProvider.triggerLogin({
			typeOfLogin: 'google',
			verifier: 'stormgate-google',
			clientId: GOOGLE_CLIENT_ID,
		});
	} catch (e) {
		console.log('TRIGGER LOGIN ERROR: ');
		console.log(e);
		return w3aSignal.TRIGGER_LOGIN_FAIL;
	}

	console.log('Init key');
	await key.initialize();

	return response;
};

/**
 * This method return private key.
 * Just call it after trigger login
 * */
export const initAfterLogin = async () => {
	// Try to reconstruct key

	// If this is the first time login
	try {
		const { totalShares, requiredShares } = key.getKeyDetails();
		if (totalShares === 2) {
			if (requiredShares <= 0) {
				await key.reconstructKey();
			}

			return w3aSignal.REQUIRE_INIT_PASSCODE;
		}
	} catch (e) {
		console.log(e);
	}
	// If storage share was found
	try {
		await key.modules.webStorage.inputShareFromWebStorage();
		console.log('Get from storage success');
		await key.reconstructKey();
		return w3aSignal.RECONSTRUCT_KEY_SUCCESS;
	} catch (e) {
		console.log(e);
	}
	// If storage share wasn't found (loss or in new browser/ device)
	return w3aSignal.REQUIRE_INPUT_PASSCODE;
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
		// await key.reconstructKey();

		// Create new share for current user
		const shareStore = await key.generateNewShare();

		// Store share into web storage
		await key.modules.webStorage.storeDeviceShare(shareStore.newShareStores[1]);

		return w3aSignal.INIT_PASSCODE_SUCCESS;
	} catch (e) {
		console.log(e);
		return w3aSignal.INIT_PASSCODE_FAIL;
	}
};

export const checkLogin = async () => {
	return null;
};
