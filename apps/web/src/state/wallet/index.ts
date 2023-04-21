import { PublicKeyDocument } from '@walless/store';

import { walletState } from './internal';

export const walletActions = {
	setSuiKeys: (keys: PublicKeyDocument[]) => {
		for (const key of keys) {
			walletState.suiKeyMap.set(key._id, key);
		}
	},
	setSolanaKeys: (keys: PublicKeyDocument[]) => {
		for (const key of keys) {
			walletState.solanaKeyMap.set(key._id, key);
		}
	},
};

export * from './internal';
