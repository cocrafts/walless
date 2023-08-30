import type { EncryptedWithPasscode } from '@walless/core';
import { Networks } from '@walless/core';

import { defaultPrefixDerivationPaths } from './utils/helpers';
import type { KeypairBySeedPhraseInitializer } from './utils/types';

export const initKeypairBySeedPhrase = (
	seedPhrase = '',
	initializer: KeypairBySeedPhraseInitializer<EncryptedWithPasscode>,
) => {
	return Promise.all(
		defaultPrefixDerivationPaths.map((prefix) => {
			switch (prefix.network) {
				case Networks.solana: {
					return initializer.solana(prefix, seedPhrase);
				}
				case Networks.sui: {
					return initializer.sui(prefix, seedPhrase);
				}
				case Networks.tezos: {
					return initializer.tezos(prefix, seedPhrase);
				}
				default: {
					console.log('Network is not supported');
					break;
				}
			}
		}),
	);
};

export * from './utils/helpers';
export * from './utils/types';
