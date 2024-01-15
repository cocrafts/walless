import Config from 'react-native-config';
import type { ISeedPhraseFormat, ModuleMap } from '@tkey/common-types';
import { generateID } from '@tkey/common-types';
import type ThresholdKey from '@tkey/default';
import { SeedPhraseModule } from '@tkey/seed-phrase';
import type { TorusServiceProvider } from '@tkey/service-provider-torus';
import type { CustomAuthArgs } from '@toruslabs/customauth';

export const customAuthArgs: CustomAuthArgs = {
	web3AuthClientId: Config.WEB3AUTH_ID as string,
	network: 'mainnet',
	baseUrl: 'metacraft://walless/auth',
	redirectToOpener: false,
	redirectPathName: 'w3a',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export enum SeedPhraseFormatType {
	PRIMARY = 'primary-seed-phrase',
}

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

export type CoreModules = ModuleMap & {
	seedPhraseModule: SeedPhraseModule;
};

export const coreModules: CoreModules = {
	seedPhraseModule: new SeedPhraseModule([
		wallessSeedPhraseFormat as ISeedPhraseFormat,
	]),
};

export type CoreThresholdKey = ThresholdKey & {
	serviceProvider: TorusServiceProvider;
	modules: CoreModules;
};
