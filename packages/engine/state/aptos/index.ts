import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface AptosToken {
	ownerAddress: string;
	creatorAddress: string;
	collectionId: string;
	collectionName: string;
	collectionUri: string;
	tokenDataId: string;
	name: string;
	description: string;
	uri: string;
	lastTransactionVersion: number;
	lastTransactionTimestamp: number;
	propertyVersion: number;
	amount: number;
}

export type AptosPendingToken = AptosToken & {
	fromAddress: string;
	toAddress: string;
};

export interface AptosState {
	directTransfer: boolean;
	pendingTokens: Map<string, AptosPendingToken>;
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