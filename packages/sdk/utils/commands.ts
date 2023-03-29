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

export const requestSignMessage = async (message: Uint8Array) => {
	const res = await sendRequest({
		from: 'walless@sdk',
		type: 'sign-message',
		message,
	});

	return { signature: new Uint8Array(Object.values(res.signature)) };
};
