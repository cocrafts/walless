import ThresholdKey from '@tkey/default';
import SecurityQuestionsModule from '@tkey/security-questions';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import WebStorageModule from '@tkey/web-storage';
import { CustomAuthArgs } from '@toruslabs/customauth';

const webStorageModule = new WebStorageModule();
const securityQuestionsModule = new SecurityQuestionsModule();

export const customAuthArgs: CustomAuthArgs = {
	network: 'testnet',
	baseUrl: `http://localhost:3002/`,
	redirectToOpener: true,
	redirectPathName: 'w3a-response',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export type TypedThresholdKey = ThresholdKey & {
	serviceProvider: TorusServiceProvider;
	modules: {
		webStorage: WebStorageModule;
		securityQuestions: SecurityQuestionsModule;
	};
};

export const key = new ThresholdKey({
	modules: {
		webStorage: webStorageModule,
		securityQuestions: securityQuestionsModule,
	},
	customAuthArgs: customAuthArgs,
}) as TypedThresholdKey;

export const initializeAndStoreKey = async () => {
	await key.initialize();

	console.log(await key.getKeyDetails());
};

export const getTkey = async () => {
	if (!key.serviceProvider.directWeb.isInitialized) {
		await key.serviceProvider.init({ skipSw: true });
		await key.modules.webStorage.inputShareFromWebStorage();
		await key.initialize();
	}
	return key;
};
