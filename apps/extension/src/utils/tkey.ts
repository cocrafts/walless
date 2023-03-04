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

export const tKey = new ThresholdKey({
    modules: {
        webStorage: webStorageModule,
        securityQuestions: securityQuestionsModule,
    },
    customAuthArgs: customAuthArgs,
});

const getTKey = async () => {
    if (!(tKey.serviceProvider as TorusServiceProvider).directWeb.isInitialized) {
        await (tKey.serviceProvider as TorusServiceProvider).init({ skipSw: true });
    }
    return tKey;
};

export default getTKey;