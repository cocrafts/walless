import type { AptosPendingToken } from './internal';
import { aptosState } from './internal';
export * from './internal';

export const aptosActions = {
	setDirectTransfer: (directTransfer: boolean) => {
		aptosState.directTransfer = directTransfer;
	},
	setPendingTokens: (tokens: AptosPendingToken[]) => {
		const { pendingTokens } = aptosState;
		pendingTokens.clear();
		for (const token of tokens) {
			pendingTokens.set(token.tokenDataId, token);
		}
	},
};
