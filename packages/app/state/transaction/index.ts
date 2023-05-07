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
		transactionContext.amount = Number(amount);
	},
	setSignatureString: (signature: string) => {
		transactionContext.signatureString = signature;
	},
	resetTransactionContext: () => {
		transactionContext.sender = '';
		transactionContext.receiver = '';
		transactionContext.amount = 0;
		transactionContext.signatureString = '';
	},
	injectRequiredElements: (elements: InjectedElements) => {
		injectedElements.tokens = elements.tokens;
		injectedElements.getTransactionFee = elements.getTransactionFee;
		injectedElements.handleClose = elements.handleClose;
	},
};

export * from './inject';
export * from './internal';
