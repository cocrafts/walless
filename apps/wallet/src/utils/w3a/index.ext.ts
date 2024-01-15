import type { ChromeExtensionStorageModule } from '@tkey/chrome-storage';
import ChromeStorageModule from '@tkey/chrome-storage';
import type {
	GenerateNewShareResult,
	ISeedPhraseFormat,
	ModuleMap,
} from '@tkey/common-types';
import { generateID } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import PrivateKeyModule, {
	ED25519Format,
	SECP256K1Format,
} from '@tkey/private-keys';
import SecurityQuestionsModule from '@tkey/security-questions';
import { SeedPhraseModule } from '@tkey/seed-phrase';
import type { TorusServiceProvider } from '@tkey/service-provider-torus';
import type { WebStorageModule } from '@tkey/web-storage';
import type { CustomAuthArgs } from '@toruslabs/customauth';
import CustomAuth from '@toruslabs/customauth';
import { logger } from '@walless/core';
import { ThresholdResult } from 'utils/auth';

import { w3aBaseUrl } from '../config/index.web';

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
	network: 'mainnet',
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
	seedPhraseModule: SeedPhraseModule;
};

export type TypedThresholdKey = ThresholdKey & {
	serviceProvider: TorusServiceProvider;
	modules: InternalModules;
};

export enum SeedPhraseFormatType {
	PRIMARY = 'primary-seed-phrase',
}

const wallessSeedPhraseFormat: Partial<ISeedPhraseFormat> = {
	type: SeedPhraseFormatType.PRIMARY,
	validateSeedPhrase: () => true,
	createSeedPhraseStore: async (seedPhrase) => {
		if (!seedPhrase) throw Error('seed phrase can not be empty');
		return {
			id: generateID(),
			type: SeedPhraseFormatType.PRIMARY,
			seedPhrase: seedPhrase,
		};
	},
};

export const modules: InternalModules = {
	securityQuestions: new SecurityQuestionsModule(),
	privateKeyModule: new PrivateKeyModule([
		new SECP256K1Format(null as never),
		new ED25519Format(null as never),
	] as never),
	seedPhraseModule: new SeedPhraseModule([
		wallessSeedPhraseFormat as ISeedPhraseFormat,
	]),
};

modules.chromeStorage = new ChromeStorageModule();

export const thresholdKey = new ThresholdKey({
	modules,
	customAuthArgs,
	manualSync: true,
	enableLogging: true,
}) as TypedThresholdKey;

export const createAndStoreDeviceShare =
	async (): Promise<GenerateNewShareResult> => {
		await thresholdKey.reconstructKey();

		const shareResult = await thresholdKey.generateNewShare();
		const share = shareResult.newShareStores[1];

		if (global.chrome?.runtime) {
			await thresholdKey.modules.chromeStorage?.storeDeviceShare(share);
		} else {
			await thresholdKey.modules.webStorage?.storeDeviceShare(share);
		}

		return shareResult;
	};

export const configureSecurityQuestionShare = async (
	passcode: string,
): Promise<void> => {
	await thresholdKey.reconstructKey();

	const question = 'universal-passcode';
	await thresholdKey.modules.securityQuestions.generateNewShareWithSecurityQuestions(
		passcode,
		question,
	);
};

export const importAvailableShares = async (): Promise<ThresholdResult> => {
	try {
		await thresholdKey.modules.chromeStorage?.inputShareFromChromeExtensionStorage();
		const { requiredShares, totalShares } = thresholdKey.getKeyDetails();
		const isReady = requiredShares <= 0;

		if (isReady) {
			return totalShares === 2
				? ThresholdResult.Initializing
				: ThresholdResult.Ready;
		}
	} catch (e) {
		logger.info('Existing share not available, skip..');
	}

	return ThresholdResult.Missing;
};

export const recoverDeviceShareFromPasscode = async (
	passcode: string,
): Promise<boolean> => {
	try {
		const beforeDetails = thresholdKey.getKeyDetails();
		await thresholdKey.modules.securityQuestions.inputShareFromSecurityQuestions(
			passcode,
		);
		const afterDetails = thresholdKey.getKeyDetails();

		if (beforeDetails.requiredShares > afterDetails.requiredShares) {
			// await createAndStoreDeviceShare();
			return true;
		}
	} catch {
		logger.error('Failed to recover/unlock, invalid passcode.');
	}

	return false;
};

export const getGoogleAuthURL = () => {
	const redirectURL = chrome.identity.getRedirectURL();
	const scopes = ['openid', 'email', 'profile'];
	let authURL = 'https://accounts.google.com/o/oauth2/auth';
	authURL += `?client_id=${BROWSER_CLIENT_ID}`;
	authURL += `&response_type=token`;
	authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
	authURL += `&scope=${encodeURIComponent(scopes.join(' '))}`;

	return authURL;
};
