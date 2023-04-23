import { TokenDocument } from '@walless/store';

import { tokenState } from './internal';

export const tokenActions = {
	setSuiTokens: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.suiTokenMap.set(item._id, item);
		}
	},
	setSolanaTokens: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.solanaTokenMap.set(item._id, item);
		}
	},
};

export * from './internal';
