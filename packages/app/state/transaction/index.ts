import type { ResponseCode } from '@walless/messaging';
import type {
	CollectibleDocument,
	CollectionDocument,
	TokenDocument,
} from '@walless/store';

import type { InjectedElements } from './inject';
import { injectedElements } from './inject';
import type { TransactionType } from './internal';
import { transactionContext } from './internal';

export const transactionActions = {
	setType: (type: TransactionType) => {
		transactionContext.type = type;
	},
	setSender: (sender: string) => {
		transactionContext.sender = sender;
	},
	setReceiver: (receiver: string) => {
		transactionContext.receiver = receiver;
	},
	setToken: (token: TokenDocument) => {
		transactionContext.token = token;
	},
	setTokenForFee: (tokenForFee: TokenDocument) => {
		transactionContext.tokenForFee = tokenForFee;
	},
	setNftCollection: (collection: CollectionDocument) => {
		transactionContext.nftCollection = collection;
	},
	setNftCollectible: (collectible: CollectibleDocument) => {
		transactionContext.nftCollectible = collectible;
		if (collectible.collectionId !== transactionContext.nftCollection?._id) {
			const collection = injectedElements.nftCollections.find(
				(ele) => ele._id === collectible.collectionId,
			);
			if (collection) transactionActions.setNftCollection(collection);
		}
	},
	setTransactionFee: (fee: number) => {
		transactionContext.transactionFee = fee;
	},
	setAmount: (amount: string) => {
		transactionContext.amount = amount;
	},
	setSignatureString: (signature: string) => {
		transactionContext.signatureString = signature;
	},
	setStatus: (status: ResponseCode) => {
		transactionContext.status = status;
	},
	setTime: () => {
		transactionContext.time = new Date();
	},
	resetTransactionContext: () => {
		transactionContext.type = 'Token';
		transactionContext.token = undefined;
		transactionContext.tokenForFee = undefined;
		transactionContext.nftCollection = undefined;
		transactionContext.nftCollectible = undefined;
		transactionContext.sender = '';
		transactionContext.receiver = '';
		transactionContext.amount = undefined;
		transactionContext.signatureString = '';
		transactionContext.status = undefined;
		transactionContext.time = undefined;
		transactionContext.transactionFee = 0;
	},
	injectRequiredElements: (elements: InjectedElements) => {
		injectedElements.tokens = elements.tokens;
		injectedElements.tokenForFee = elements.tokenForFee;
		injectedElements.nftCollections = elements.nftCollections;
		injectedElements.nftCollectibles = elements.nftCollectibles;
		injectedElements.publicKeys = elements.publicKeys;
		injectedElements.getTransactionFee = elements.getTransactionFee;
		injectedElements.getTransactionAbstractFee =
			elements.getTransactionAbstractFee;
		injectedElements.handleClose = elements.handleClose;
		injectedElements.checkValidAddress = elements.checkValidAddress;
		injectedElements.createAndSendTransaction =
			elements.createAndSendTransaction;
		injectedElements.handleSendNftSuccess = elements.handleSendNftSuccess;
	},
};

export * from './inject';
export * from './internal';
