import CustomAuth, {
	AGGREGATE_VERIFIER,
	CustomAuthArgs,
} from '@toruslabs/customauth';

const customAuthArgs: CustomAuthArgs = {
	network: 'testnet',
	baseUrl: `http://localhost:3002`,
	redirectToOpener: true,
	redirectPathName: 'w3a-response',
	enableLogging: false,
	popupFeatures: 'width=380,height=600',
};

export const customAuth = new CustomAuth(customAuthArgs);

export const googleSignIn = () => {
	return customAuth.triggerAggregateLogin({
		aggregateVerifierType: AGGREGATE_VERIFIER.SINGLE_VERIFIER_ID,
		verifierIdentifier: 'stormgate-testnet',
		subVerifierDetailsArray: [
			{
				typeOfLogin: 'google',
				verifier: 'google',
				clientId: GOOGLE_CLIENT_ID,
			},
		],
	});
};
