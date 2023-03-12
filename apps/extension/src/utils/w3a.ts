import ChromeStorageModule from '@tkey/chrome-storage';
import { GenerateNewShareResult, ModuleMap } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import PrivateKeyModule, {
	ED25519Format,
	SECP256K1Format,
} from '@tkey/private-keys';
import SecurityQuestionsModule from '@tkey/security-questions';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import WebStorageModule from '@tkey/web-storage';
import { CustomAuthArgs } from '@toruslabs/customauth';

/* 1. First time login: save 1 device fragment, 1 passcode fragment
 * 2. Repeat login on the same machine: quite powerful
 * 3. New device: auth fragment + passcode fragment
 * 4. Create as much fragment as we want, including *securityQuestion fragments?
 * 5. Fragment is delete-able
 * 6. Manual-sync mode: make sure key <- test without lost account caused by key creation
 * 7. Private keys: could be created and store in metadata
 * ------------------ */

export const customAuthArgs: CustomAuthArgs = {
	network: 'testnet',
	baseUrl: `http://localhost:3002/`,
	redirectToOpener: true,
	redirectPathName: 'w3a-response',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export type InternalModules = ModuleMap & {
	webStorage?: WebStorageModule;
	chromeStorage?: ChromeStorageModule;
	securityQuestions: SecurityQuestionsModule;
	privateKeyModule: PrivateKeyModule;
};

export type TypedThresholdKey = ThresholdKey & {
	serviceProvider: TorusServiceProvider;
	modules: InternalModules;
};

const modules: InternalModules = {
	securityQuestions: new SecurityQuestionsModule(),
	privateKeyModule: new PrivateKeyModule([
		SECP256K1Format,
		ED25519Format,
	] as never),
};

if (global.chrome?.runtime) {
	modules.chromeStorage = new ChromeStorageModule();
} else {
	modules.webStorage = new WebStorageModule();
}

export const key = new ThresholdKey({
	modules,
	customAuthArgs,
}) as TypedThresholdKey;

export const createAndStoreDeviceShare =
	async (): Promise<GenerateNewShareResult> => {
		await key.reconstructKey();

		const shareResult = await key.generateNewShare();
		const share = shareResult.newShareStores[1];
		console.log(shareResult);

		if (global.chrome?.runtime) {
			await key.modules.chromeStorage?.storeDeviceShare(share);
		} else {
			await key.modules.webStorage?.storeDeviceShare(share);
		}

		return shareResult;
	};

export const configureSecurityQuestionShare = async (
	passcode: string,
): Promise<void> => {
	await key.reconstructKey();

	const question = 'universal-passcode';
	await key.modules.securityQuestions.generateNewShareWithSecurityQuestions(
		passcode,
		question,
	);
};

export enum ThresholdResult {
	Initializing = 'initializing',
	Ready = 'ready',
	Missing = 'missing',
	Failure = 'failure',
}

export const importAvailableShares = async (): Promise<ThresholdResult> => {
	try {
		if (global.chrome?.runtime) {
			await key.modules.chromeStorage?.inputShareFromChromeExtensionStorage();
		} else {
			await key.modules.webStorage?.inputShareFromWebStorage();
		}

		const { requiredShares, totalShares } = await key.getKeyDetails();
		const isReady = requiredShares <= 0;

		if (isReady) {
			return totalShares === 2
				? ThresholdResult.Initializing
				: ThresholdResult.Ready;
		} else {
			return ThresholdResult.Missing;
		}
	} catch (e) {
		console.log(e);
		return ThresholdResult.Failure;
	}
};

export const recoverDeviceShare = async (passcode: string) => {
	await key.modules.securityQuestions.inputShareFromSecurityQuestions(passcode);
	await createAndStoreDeviceShare();
};
