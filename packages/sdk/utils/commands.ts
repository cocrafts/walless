import { ConnectOptions } from '@walless/core';

import { sendRequest } from './messaging';

export const requestConnect = async (options: ConnectOptions) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'request-connect',
		options,
	});
};

export const requestSignAndSendTransaction = async () => {
	//
};

export const requestSignMessage = async (message: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-message',
		message,
	});
};

export const requestSignTransaction = async (transaction: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-transaction',
		transaction,
	});
};
