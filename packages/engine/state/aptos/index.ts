import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface AptosToken {
	fromAddress: string;
	toAddress: string;
	creatorAddress: string;
	collectionId: string;
	collectionName: string;
	tokenDataId: string;
	name: string;
	lastTransactionVersion: number;
	lastTransactionTimestamp: number;
	propertyVersion: number;
	amount: number;
}

export interface AptosState {
	directTransfer: boolean;
	pendingTokens: Map<string, AptosToken>;
	ownedTokens: Map<string, AptosToken>;
}

export const aptosState = proxy<AptosState>({
	directTransfer: false,
	pendingTokens: proxyMap(),
	ownedTokens: proxyMap(),
});

export const aptosActions = {
	setDirectTransfer: (directTransfer: boolean) => {
		aptosState.directTransfer = directTransfer;
	},
	setPendingTokens: (tokens: AptosToken[]) => {
		const { pendingTokens } = aptosState;
		for (const token of tokens) {
			pendingTokens.set(token.tokenDataId, token);
		}
	},
	setOwnedTokens: (tokens: AptosToken[]) => {
		const { ownedTokens } = aptosState;
		for (const token of tokens) {
			ownedTokens.set(token.tokenDataId, token);
		}
	},
};
