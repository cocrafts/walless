import CustomAuth, { CustomAuthArgs } from '@toruslabs/customauth';

const customAuthArgs: CustomAuthArgs = {
	network: 'testnet',
	baseUrl: 'http://localhost:3001',
	redirectPathName: 'auth',
	enableLogging: false,
};

export const customAuth = new CustomAuth(customAuthArgs);
