// Configuration of Modules
import ThresholdKey from '@tkey/default';
import SecurityQuestionsModule from '@tkey/security-questions';
import WebStorageModule from '@tkey/web-storage';
import { customAuthArgs } from 'utils/w3a';

const webStorageModule = new WebStorageModule();
const securityQuestionsModule = new SecurityQuestionsModule();

let loginFlag = false;

// Instantiation of tKey
export const tKey = new ThresholdKey({
	modules: {
		webStorage: webStorageModule,
		securityQuestions: securityQuestionsModule,
	},
	customAuthArgs: customAuthArgs,
});

export const triggerLogin = async () => {
	try {
		// Triggering Login using Service Provider ==> opens the popup
		const loginResponse = await (tKey.serviceProvider as any).triggerLogin({
			typeOfLogin: 'google', // type of login
			verifier: 'google',
			clientId: GOOGLE_CLIENT_ID,
		});
		loginFlag = true;
	} catch (error) {
		console.log(error);
	}
};

export const initializeNewKey = async () => {
	if (!loginFlag) {
		return 'Require login';
	}

	try {
		// Initialization of tKey
		await tKey.initialize(); // 1/2 flow
		// Gets the deviceShare
		try {
			await (tKey.modules.webStorage as any).inputShareFromWebStorage(); // 2/2 flow
		} catch (error) {
			console.error(error);
			return 'Storage loss, using password to reconstruct private key';
		}

		// Checks the requiredShares to reconstruct the tKey,
		// starts from 2 by default and each of the above share reduce it by one.
		const { requiredShares } = tKey.getKeyDetails();
		if (requiredShares <= 0) {
			const reconstructedKey = await tKey.reconstructKey();
			console.log('Private Key: ' + reconstructedKey.privKey.toString('hex'));
			// This private key will be used to make blockchain calls.
			return reconstructedKey.privKey.toString('hex');
		}
		return 'Something wrong, dont enough required share';
	} catch (error) {
		console.error(error, 'caught');
		return 'Something wrong';
	}
};

export const generateNewShareWithPassword = async (password: string) => {
	await (
		tKey.modules.securityQuestions as any
	).generateNewShareWithSecurityQuestions(password, 'whats your password?');
};

export const recoverShareByPassword = async (password: any) => {
	try {
		// Add password into tKey
		await (
			tKey.modules.securityQuestions as any
		).inputShareFromSecurityQuestions(password);

		// After input password -> 2/2 -> be able to reconstruct key
		tKey.reconstructKey();

		// Add storage share for after
		const shareStore = await tKey.generateNewShare();
		await (tKey.modules.webStorage as any).storeDeviceShare(
			shareStore.newShareStores[1],
		);

		return tKey.privKey.toString('hex');
	} catch (error) {
		console.log('Error', (error as any)?.message.toString(), 'error');
		return null;
	}
};
