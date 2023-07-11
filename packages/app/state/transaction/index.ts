import type { Token } from '@walless/core';
import type { ResponseCode } from '@walless/messaging';

import type { InjectedElements } from './inject';
import { injectedElements } from './inject';
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
	setStatus: (status: ResponseCode) => {
		transactionContext.status = status;
	},
	setTime: () => {
		transactionContext.time = new Date();
	},
	resetTransactionContext: () => {
		transactionContext.token = undefined;
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
