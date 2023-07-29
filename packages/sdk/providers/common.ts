import type { ConnectOptions } from '@walless/core';
import { Timeout } from '@walless/core';
import { RequestType } from '@walless/messaging';

import { sendRequest } from '../utils/messaging';

const from = 'walless@sdk';

export const requestConnect = async (options: ConnectOptions) => {
	return await sendRequest(
		{
			from,
			type: RequestType.REQUEST_CONNECT,
			options,
		},
		Timeout.thirtySeconds,
	);
};

export const requestInstallLayout = async (id: string) => {
	return await sendRequest(
		{
			from,
			type: RequestType.INSTALL_LAYOUT,
			id,
		},
		Timeout.thirtySeconds,
	);
};

export const requestCheckInstalledLayout = async (id: string) => {
	return await sendRequest(
		{
			from,
			type: RequestType.CHECK_INSTALLED_LAYOUT,
			id,
		},
		Timeout.thirtySeconds,
	);
};

export const requestOpenLayoutPopup = async (id: string) => {
	return await sendRequest(
		{
			from,
			type: RequestType.OPEN_LAYOUT_POPUP,
			id,
		},
		Timeout.thirtySeconds,
	);
};
