import type { ConnectOptions } from '@walless/core';
import { RequestType } from '@walless/messaging';

import { sendRequest } from '../utils/messaging';

export const requestConnect = async (options: ConnectOptions) => {
	return await sendRequest(
		{
			from: 'walless@sdk',
			type: RequestType.REQUEST_CONNECT,
			options,
		},
		30000,
	);
};

export const requestInstallLayout = async (input: string) => {
	return await sendRequest(
		{
			from: 'walless@sdk',
			type: RequestType.INSTALL_LAYOUT,
			input,
		},
		30000,
	);
};
