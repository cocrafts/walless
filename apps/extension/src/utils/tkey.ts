import ThresholdKey from '@tkey/default';
import PrivateKeyModule, {
	ED25519Format,
	SECP256K1Format,
} from '@tkey/private-keys';
import SecurityQuestionsModule from '@tkey/security-questions';
import { TorusServiceProvider } from '@tkey/service-provider-torus';
import WebStorageModule from '@tkey/web-storage';
import { CustomAuthArgs } from '@toruslabs/customauth';

const webStorageModule = new WebStorageModule();
const securityQuestionsModule = new SecurityQuestionsModule();

const privateKeyModule = new PrivateKeyModule([
	new SECP256K1Format(),
	new ED25519Format(),
]);

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
		privateKeyModule: PrivateKeyModule;
	};
};

export const key = new ThresholdKey({
	modules: {
		webStorage: webStorageModule,
		securityQuestions: securityQuestionsModule,
		privateKeyModule: privateKeyModule,
	},
	customAuthArgs: customAuthArgs,
}) as TypedThresholdKey;
