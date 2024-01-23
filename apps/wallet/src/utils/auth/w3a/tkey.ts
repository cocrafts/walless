import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { ShareStore } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import { ReactNativeStorageModule } from '@tkey/react-native-storage';
import type { CustomAuthArgs } from '@toruslabs/customauth';
import CustomAuthCore from '@toruslabs/customauth-react-native-sdk';

import { type CoreModules, coreModules, type CoreThresholdKey } from './core';

export const customAuthArgs: CustomAuthArgs = {
	web3AuthClientId: Config.WEB3AUTH_ID as string,
	network: 'mainnet',
	baseUrl: 'metacraft://walless/auth',
	redirectToOpener: false,
	redirectPathName: 'w3a',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

type MobileTkeyModules = CoreModules & {
	reactNativeStorage: ReactNativeStorageModule;
};

type MobileTkey = CoreThresholdKey & {
	modules: MobileTkeyModules;
};

export const CustomAuth = CustomAuthCore;

export const initTkey = (): MobileTkey => {
	return new ThresholdKey({
		customAuthArgs,
		manualSync: true,
		enableLogging: false,
		modules: {
			...coreModules,
			reactNativeStorage: new ReactNativeStorageModule(EncryptedStorage),
		},
	}) as MobileTkey;
};

export const storeDeviceShare = async (tkey: MobileTkey, share: ShareStore) => {
	return await tkey.modules.reactNativeStorage.storeDeviceShare(share);
};

export const importDeviceShare = async (tkey: MobileTkey) => {
	return await tkey.modules.reactNativeStorage.inputShareFromReactNativeStorage();
};
