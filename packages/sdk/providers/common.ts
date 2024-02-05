import { RequestType, Timeout } from '@walless/core';

import { sendRequest } from '../utils/messaging';
import type { ConnectOptions } from '../utils/type';

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

export const requestDisconnect = async (options: ConnectOptions) => {
	return await sendRequest({
		from,
		type: RequestType.REQUEST_DISCONNECT,
		options,
	});
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
