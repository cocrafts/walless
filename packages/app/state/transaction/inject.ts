import type { Networks, TransactionPayload } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import type {
	CollectibleDocument,
	CollectionDocument,
	PublicKeyDocument,
	TokenDocument,
} from '@walless/store';
import { proxy } from 'valtio';

export interface InjectedElements {
	tokens: TokenDocument[];
	nftCollections: CollectionDocument[];
	nftCollectibles: CollectibleDocument[];
	publicKeys: PublicKeyDocument[];
	getTransactionFee: (payload: TransactionPayload) => Promise<number>;
	handleClose: () => void;
	checkValidAddress: (
		keyStr: string,
		network: Networks,
	) => { valid: boolean; message: string };
	createAndSendTransaction: (
		payload: TransactionPayload,
		passcode?: string,
	) => Promise<ResponsePayload>;
	getTransactionResult: (
		signature: string,
		network: Networks,
	) => Promise<{ time?: Date }>;
	handleSendNftSuccess?: (collectible: CollectibleDocument) => void;
}

export const injectedElements = proxy<InjectedElements>({
	tokens: [],
	nftCollections: [],
	nftCollectibles: [],
	publicKeys: [],
	getTransactionFee: async () => 0,
	handleClose: () => console.log('close'),
	checkValidAddress: () => {
		return { valid: true, message: '' };
	},
	createAndSendTransaction: async () => {
		return {};
	},
	getTransactionResult: async () => {
		return {};
	},
});
