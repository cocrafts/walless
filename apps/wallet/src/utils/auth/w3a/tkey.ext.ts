import type { ChromeExtensionStorageModule } from '@tkey/chrome-storage';
import ChromeStorageModule from '@tkey/chrome-storage';
import type { ShareStore } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import type { CustomAuthArgs } from '@toruslabs/customauth';
import CustomAuthCore from '@toruslabs/customauth-react-native-sdk';

import { w3aBaseUrl } from '../../config/index.web';

import type { CoreThresholdKey } from './core';
import { type CoreModules, coreModules } from './core';

type ExtTkeyModules = CoreModules & {
	chromeStorage: ChromeExtensionStorageModule;
};

type ExtTkey = CoreThresholdKey & {
	modules: ExtTkeyModules;
};

export const customAuthArgs: CustomAuthArgs = {
	web3AuthClientId: WEB3AUTH_ID,
	network: 'mainnet',
	baseUrl: w3aBaseUrl,
	redirectToOpener: true,
	redirectPathName: 'w3a',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export const CustomAuth = CustomAuthCore;

export const initTkey = () => {
	return new ThresholdKey({
		customAuthArgs,
		manualSync: true,
		enableLogging: true,
		modules: {
			...coreModules,
			ChromeStorageModule: new ChromeStorageModule(),
		},
	});
};

export const storeDeviceShare = async (tkey: ExtTkey, share: ShareStore) => {
	return await tkey.modules.chromeStorage.storeDeviceShare(share);
};

export const importDeviceShare = async (tkey: ExtTkey) => {
	return await tkey.modules.chromeStorage.inputShareFromChromeExtensionStorage();
};
