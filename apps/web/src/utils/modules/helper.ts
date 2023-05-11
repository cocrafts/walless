import { Networks } from '@walless/core';

export const selectors = {
	allExtensions: { selector: { type: 'Extension' } },
	allKeys: { selector: { type: 'PublicKey' } },
	solanaKeys: { selector: { type: 'PublicKey', network: Networks.solana } },
	suiKeys: { selector: { type: 'PublicKey', network: Networks.sui } },
	allTokens: { selector: { type: 'Token' } },
};
