import ThresholdKey from '@tkey/default';
import SecurityQuestionsModule from '@tkey/security-questions';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import WebStorageModule from '@tkey/web-storage';
import { CustomAuthArgs, TorusLoginResponse } from '@toruslabs/customauth';

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

export const googleSignIn = async (): Promise<TorusLoginResponse> => {
	const { serviceProvider } = key;

	if (!serviceProvider.directWeb.isInitialized) {
		await serviceProvider.init({ skipSw: true });
	}

	const response = await serviceProvider.triggerLogin({
		typeOfLogin: 'google',
		verifier: 'walless-gc',
		clientId: GOOGLE_CLIENT_ID,
	});

	return response;
};
