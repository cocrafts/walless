import ChromeStorageModule from '@tkey/chrome-storage';
import { ModuleMap } from '@tkey/common-types';
import ThresholdKey from '@tkey/default';
import PrivateKeyModule, {
	ED25519Format,
	SECP256K1Format,
} from '@tkey/private-keys';
import SecurityQuestionsModule from '@tkey/security-questions';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import WebStorageModule from '@tkey/web-storage';
import { CustomAuthArgs } from '@toruslabs/customauth';

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
