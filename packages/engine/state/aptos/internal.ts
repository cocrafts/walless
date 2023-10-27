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
}

export const aptosState = proxy<AptosState>({
	directTransfer: false,
	pendingTokens: proxyMap(),
});
