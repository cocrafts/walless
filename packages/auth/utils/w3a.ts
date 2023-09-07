import type { ChromeExtensionStorageModule } from '@tkey/chrome-storage';
import type {
	GenerateNewShareResult,
	ISeedPhraseFormat,
	ModuleMap,
} from '@tkey/common-types';
import { generateID } from '@tkey/common-types';
import type ThresholdKey from '@tkey/default';
import type PrivateKeyModule from '@tkey/private-keys';
import type { ReactNativeStorageModule } from '@tkey/react-native-storage';
import type SecurityQuestionsModule from '@tkey/security-questions';
import type { SeedPhraseModule } from '@tkey/seed-phrase';
import type { TorusServiceProvider } from '@tkey/service-provider-torus';
import type { WebStorageModule } from '@tkey/web-storage';
import { runtime } from '@walless/core';
import { modules } from '@walless/ioc';

export enum ThresholdResult {
	Initializing = 'initializing',
	Ready = 'ready',
	Missing = 'missing',
}

export type InternalModules = ModuleMap & {
	webStorage?: WebStorageModule;
	chromeStorage?: ChromeExtensionStorageModule;
	reactNativeStorage?: ReactNativeStorageModule;
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

export const key = (): TypedThresholdKey => {
	return modules.thresholdKey as never;
};

export const wallessSeedPhraseFormat: Partial<ISeedPhraseFormat> = {
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

export const createAndStoreDeviceShare =
	async (): Promise<GenerateNewShareResult> => {
		await key().reconstructKey();

		const shareResult = await key().generateNewShare();
		const share = shareResult.newShareStores[1];

		if (global.chrome?.runtime) {
			await key().modules.chromeStorage?.storeDeviceShare(share);
		} else {
			await key().modules.webStorage?.storeDeviceShare(share);
		}

		return shareResult;
	};

export const configureSecurityQuestionShare = async (
	passcode: string,
): Promise<void> => {
	await key().reconstructKey();

	const question = 'universal-passcode';
	await key().modules.securityQuestions.generateNewShareWithSecurityQuestions(
		passcode,
		question,
	);
};

export const getSharesStatus = async (): Promise<ThresholdResult> => {
	try {
		if (runtime.isMobile) {
			await key().modules.reactNativeStorage?.inputShareFromReactNativeStorage();
		} else if (global.chrome?.runtime) {
			await key().modules.chromeStorage?.inputShareFromChromeExtensionStorage();
		} else {
			await key().modules.webStorage?.inputShareFromWebStorage();
		}
	} catch (e) {
		console.log('Failed to import existing share.');
	}

	const { requiredShares, totalShares } = key().getKeyDetails();
	const isReady = requiredShares <= 0;

	if (isReady) {
		return totalShares === 2
			? ThresholdResult.Initializing
			: ThresholdResult.Ready;
	}

	return ThresholdResult.Missing;
};

export const recoverDeviceShareFromPasscode = async (
	passcode: string,
): Promise<boolean> => {
	try {
		const beforeDetails = key().getKeyDetails();
		await key().modules.securityQuestions.inputShareFromSecurityQuestions(
			passcode,
		);
		const afterDetails = key().getKeyDetails();

		if (beforeDetails.requiredShares > afterDetails.requiredShares) {
			// await createAndStoreDeviceShare();
			return true;
		}
	} catch {
		console.log('Failed to recover/unlock, invalid passcode.');
	}

	return false;
};
