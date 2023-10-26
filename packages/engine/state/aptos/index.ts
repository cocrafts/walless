import type { AptosPendingToken, AptosToken } from './internal';
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
	setOwnedTokens: (tokens: AptosToken[]) => {
		const { ownedTokens } = aptosState;
		ownedTokens.clear();
		for (const token of tokens) {
			ownedTokens.set(token.tokenDataId, token);
		}
	},
};
