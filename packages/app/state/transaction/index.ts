import type { Collectible, Collection, Token } from '@walless/core';
import type { ResponseCode } from '@walless/messaging';

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
	setToken: (token: Token) => {
		transactionContext.token = token;
	},
	setNftCollection: (collection: Collection) => {
		transactionContext.nftCollection = collection;
	},
	setNftCollectible: (collectible: Collectible) => {
		transactionContext.nftCollectible = collectible;
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
		injectedElements.nftCollections = elements.nftCollections;
		injectedElements.nftCollectibles = elements.nftCollectibles;
		injectedElements.publicKeys = elements.publicKeys;
		injectedElements.getTransactionFee = elements.getTransactionFee;
		injectedElements.handleClose = elements.handleClose;
		injectedElements.checkValidAddress = elements.checkValidAddress;
		injectedElements.createAndSendTransaction =
			elements.createAndSendTransaction;
		injectedElements.getTransactionResult = elements.getTransactionResult;
	},
};

export * from './inject';
export * from './internal';
