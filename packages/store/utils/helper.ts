import { Networks } from '@walless/core';

import type { DocumentType } from './type';

export type Selector = {
	selector: Partial<{
		type: DocumentType;
		network: Networks;
	}>;
};

export const selectors: Record<string, Selector> = {
	allExtensions: { selector: { type: 'Extension' } },
	allWidgets: { selector: { type: 'Widget' } },
	allKeys: { selector: { type: 'PublicKey' } },
	solanaKeys: { selector: { type: 'PublicKey', network: Networks.solana } },
	suiKeys: { selector: { type: 'PublicKey', network: Networks.sui } },
	tezosKeys: { selector: { type: 'PublicKey', network: Networks.tezos } },
	aptosKeys: { selector: { type: 'PublicKey', network: Networks.aptos } },
	allTokens: { selector: { type: 'Token' } },
	allCollectibles: { selector: { type: 'NFT' } },
	allCollections: { selector: { type: 'Collection' } },
	trustedDomains: { selector: { type: 'TrustedDomain' } },
};
