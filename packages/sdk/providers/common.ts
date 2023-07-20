import type { ConnectOptions } from '@walless/core';
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
		30000,
	);
};

export const requestInstallLayout = async (id: string) => {
	return await sendRequest(
		{
			from,
			type: RequestType.INSTALL_LAYOUT,
			id,
		},
		30000,
	);
};

export const requestCheckInstalledLayout = async (id: string) => {
	return await sendRequest(
		{
			from,
			type: RequestType.CHECK_INSTALLED_LAYOUT,
			id,
		},
		30000,
	);
};

export const requestOpenLayoutPopup = async (id: string) => {
	return await sendRequest(
		{
			from,
			type: RequestType.OPEN_LAYOUT_POPUP,
			id,
		},
		30000,
	);
};
