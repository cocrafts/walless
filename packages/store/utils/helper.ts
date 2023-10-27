import { Networks } from '@walless/core';

export const selectors = {
	allExtensions: { selector: { type: 'Extension' } },
	allWidgets: { selector: { type: 'Widget' } },
	allKeys: { selector: { type: 'PublicKey' } },
	keyByNetwork: (network: Networks) => ({
		selector: { type: 'PublicKey', network },
	}),
	solanaKeys: { selector: { type: 'PublicKey', network: Networks.solana } },
	suiKeys: { selector: { type: 'PublicKey', network: Networks.sui } },
	tezosKeys: { selector: { type: 'PublicKey', network: Networks.tezos } },
	aptosKeys: { selector: { type: 'PublicKey', network: Networks.aptos } },
	allTokens: { selector: { type: 'Token' } },
	allCollectibles: { selector: { type: 'NFT' } },
	allCollections: { selector: { type: 'Collection' } },
	trustedDomains: { selector: { type: 'TrustedDomain' } },
};
