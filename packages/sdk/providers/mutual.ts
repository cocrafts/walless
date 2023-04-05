import { ConnectOptions } from '@walless/core';

import { sendRequest } from '../utils/messaging';

export const requestConnect = async (options: ConnectOptions) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'request-connect',
		options,
	});
};
