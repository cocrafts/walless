import { Networks } from '@walless/core';

export const selectors = {
	allExtensions: { selector: { type: 'Extension' } },
	allKeys: { selector: { type: 'PublicKey' } },
	keyByNetwork: (network: Networks) => ({
		selector: { type: 'PublicKey', network },
	}),
	solanaKeys: { selector: { type: 'PublicKey', network: Networks.solana } },
	suiKeys: { selector: { type: 'PublicKey', network: Networks.sui } },
	tezosKeys: { selector: { type: 'PublicKey', network: Networks.tezos } },
	allTokens: { selector: { type: 'Token' } },
	trustedDomains: { selector: { type: 'TrustedDomain' } },
};
