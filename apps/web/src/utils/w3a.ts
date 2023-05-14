import { type ChromeExtensionStorageModule } from '@tkey/chrome-storage';
import type { GenerateNewShareResult, ModuleMap } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import PrivateKeyModule, {
	ED25519Format,
	SECP256K1Format,
} from '@tkey/private-keys';
import SecurityQuestionsModule from '@tkey/security-questions';
import { type TorusServiceProvider } from '@tkey/service-provider-torus';
import { type WebStorageModule } from '@tkey/web-storage';
import CustomAuth, { type CustomAuthArgs } from '@toruslabs/customauth';
import { ThresholdResult } from '@walless/app';
import { runtime } from '@walless/core';
import { w3aBaseUrl } from 'utils/config';

/* 1. First time login: save 1 device fragment, 1 passcode fragment
 * 2. Repeat login on the same machine: quite powerful
 * 3. New device: auth fragment + passcode fragment
 * 4. Create as much fragment as we want, including *securityQuestion fragments?
 * 5. Fragment is delete-able
 * 6. Manual-sync mode: make sure key <- test without lost account caused by key creation
 * 7. Private keys: could be created and store in metadata
 * ------------------ */

export const customAuthArgs: CustomAuthArgs = {
	web3AuthClientId: WEB3AUTH_ID,
	network: 'testnet',
	baseUrl: w3aBaseUrl,
	redirectToOpener: true,
	redirectPathName: 'w3a',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export const customAuth = new CustomAuth(customAuthArgs);

export type InternalModules = ModuleMap & {
	webStorage?: WebStorageModule;
	chromeStorage?: ChromeExtensionStorageModule;
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
		new SECP256K1Format(null as never),
		new ED25519Format(null as never),
	] as never),
};

if (runtime.isExtension) {
	import('@tkey/chrome-storage').then(({ default: ChromeStorageModule }) => {
		modules.chromeStorage = new ChromeStorageModule();
	});
} else if (runtime.isBrowser) {
	import('@tkey/web-storage').then(({ default: WebStorageModule }) => {
		modules.webStorage = new WebStorageModule();
	});
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
		}
	} catch (e) {
		console.log('Failed to import existing share.');
	}

	return ThresholdResult.Missing;
};

export const recoverDeviceShareFromPasscode = async (
	passcode: string,
): Promise<boolean> => {
	try {
		const beforeDetails = await key.getKeyDetails();
		await key.modules.securityQuestions.inputShareFromSecurityQuestions(
			passcode,
		);
		const afterDetails = await key.getKeyDetails();

		if (beforeDetails.requiredShares > afterDetails.requiredShares) {
			// await createAndStoreDeviceShare();
			return true;
		}
	} catch {
		console.log('Failed to recover/unlock, invalid passcode.');
	}

	return false;
};
