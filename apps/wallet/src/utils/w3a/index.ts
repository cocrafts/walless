import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { ISeedPhraseFormat, ModuleMap } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import { ReactNativeStorageModule } from '@tkey/react-native-storage';
import SecurityQuestionsModule from '@tkey/security-questions';
import { SeedPhraseModule } from '@tkey/seed-phrase';
import { ShareSerializationModule } from '@tkey/share-serialization';
import { ShareTransferModule } from '@tkey/share-transfer';
import type { CustomAuthArgs } from '@toruslabs/customauth';
import type { TypedThresholdKey } from 'utils/auth';
import { wallessSeedPhraseFormat } from 'utils/auth';

export const customAuthArgs: CustomAuthArgs = {
	web3AuthClientId: Config.WEB3AUTH_ID as string,
	network: 'mainnet',
	baseUrl: 'metacraft://walless/auth',
	redirectToOpener: false,
	redirectPathName: 'w3a',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
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

export const thresholdKey = new ThresholdKey({
	modules,
	customAuthArgs,
	manualSync: true,
	enableLogging: false,
}) as TypedThresholdKey;
