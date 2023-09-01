import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { ISeedPhraseFormat, ModuleMap } from '@tkey/common-types';
import { generateID } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import { ReactNativeStorageModule } from '@tkey/react-native-storage';
import SecurityQuestionsModule from '@tkey/security-questions';
import { SeedPhraseModule } from '@tkey/seed-phrase';
import { ShareSerializationModule } from '@tkey/share-serialization';
import { ShareTransferModule } from '@tkey/share-transfer';
import type { CustomAuthArgs } from '@toruslabs/customauth';
import CustomAuth from '@toruslabs/customauth';

export const customAuthArgs: CustomAuthArgs = {
	web3AuthClientId: Config.WEB3AUTH_ID as string,
	network: __DEV__ ? 'testnet' : 'mainnet',
	baseUrl: 'https:app.walless.io',
	redirectToOpener: true,
	redirectPathName: 'w3a',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export const customAuth = new CustomAuth(customAuthArgs);
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

const shareTransferModule = new ShareTransferModule();
const shareSerializationModule = new ShareSerializationModule();
const securityQuestionsModule = new SecurityQuestionsModule();
const reactNativeStorageModule = new ReactNativeStorageModule(EncryptedStorage);
const seedPhraseModule = new SeedPhraseModule([
	wallessSeedPhraseFormat as ISeedPhraseFormat,
]);

const modules: ModuleMap = {
	seedPhraseModule: seedPhraseModule,
	shareTransfer: shareTransferModule,
	shareSerialization: shareSerializationModule,
	securityQuestions: securityQuestionsModule,
	reactNativeStorage: reactNativeStorageModule,
};

export const key = new ThresholdKey({
	modules,
	customAuthArgs,
	manualSync: true,
	enableLogging: __DEV__,
});
