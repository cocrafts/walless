import CustomAuth, { CustomAuthArgs } from '@toruslabs/customauth';

const customAuthArgs: CustomAuthArgs = {
	network: 'testnet',
	baseUrl: `http://localhost:3002`,
	redirectToOpener: true,
	redirectPathName: 'w3a-response',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export const customAuth = new CustomAuth(customAuthArgs);
