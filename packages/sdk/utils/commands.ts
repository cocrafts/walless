import { ConnectOptions } from '@walless/core';

import { sendRequest } from './messaging';

export const requestConnect = async (options: ConnectOptions) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'request-connect',
		options,
	});
};

export const requestSignAndSendTransaction = async (
	transaction: Uint8Array,
	options,
) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-and-send-transaction',
		transaction,
		options,
	});
};

export const requestSignMessage = async (message: Uint8Array) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-message',
		message,
	});
};

export const requestSignTransaction = async (transaction: Uint8Array) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-transaction',
		transaction,
	});
};
