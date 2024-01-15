import type { ShareStore } from '@tkey/common-types';
import type { WebStorageModule } from '@tkey/web-storage';
import type { CustomAuthArgs } from '@toruslabs/customauth';
import CustomAuthCore from '@toruslabs/customauth';
import { w3aBaseUrl } from 'utils/config/index.web';

import type { CoreModules, CoreThresholdKey } from './core';

type WebTkeyModules = CoreModules & {
	webStorage: WebStorageModule;
};

type WebTkey = CoreThresholdKey & {
	modules: WebTkeyModules;
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

export const CustomAuth = new CustomAuthCore(customAuthArgs);

export const initTkey = (): WebTkey => {
	return {} as WebTkey;
};

export const storeDeviceShare = async (tkey: WebTkey, share: ShareStore) => {
	return await tkey.modules.webStorage.storeDeviceShare(share);
};

export const importDeviceShare = async (tkey: WebTkey) => {
	return await tkey.modules.webStorage.inputShareFromWebStorage();
};
