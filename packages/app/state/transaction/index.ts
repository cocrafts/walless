import { Token } from '@walless/core';

import { InjectedElements, injectedElements } from './inject';
import { transactionContext } from './internal';

export const transactionActions = {
	setSender: (sender: string) => {
		transactionContext.sender = sender;
	},
	setReceiver: (receiver: string) => {
		transactionContext.receiver = receiver;
	},
	setToken: (token: Token) => {
		transactionContext.token = token;
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
	resetTransactionContext: () => {
		transactionContext.token = undefined;
		transactionContext.sender = '';
		transactionContext.receiver = '';
		transactionContext.amount = undefined;
		transactionContext.signatureString = '';
	},
	injectRequiredElements: (elements: InjectedElements) => {
		injectedElements.tokens = elements.tokens;
		injectedElements.publicKeys = elements.publicKeys;
		injectedElements.getTransactionFee = elements.getTransactionFee;
		injectedElements.handleClose = elements.handleClose;
		injectedElements.checkValidAddress = elements.checkValidAddress;
	},
};

export * from './inject';
export * from './internal';
