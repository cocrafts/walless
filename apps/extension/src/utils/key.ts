import ThresholdKey from '@tkey/default';
import SecurityQuestionModule from '@tkey/security-questions';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import WebStorageModule from '@tkey/web-storage';
import { CustomAuthArgs } from '@toruslabs/customauth';

const customAuthArgs: CustomAuthArgs = {
	uxMode: 'popup',
	baseUrl: `${window.location.origin}/serviceworker`,
	network: 'testnet',
	popupFeatures: 'width=400,height=600',
};

const webStorage = new WebStorageModule();
const securityQuestions = new SecurityQuestionModule();

export const key = new ThresholdKey({
	modules: {
		webStorage,
		securityQuestions,
	},
	customAuthArgs,
});

export const serviceProvider = key.serviceProvider as TorusServiceProvider;
