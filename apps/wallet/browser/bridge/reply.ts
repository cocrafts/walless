import { PopupType, RequestType, ResponseCode } from '@walless/core';
import { Channels } from '@walless/messaging';

import type { PayloadOptions, PopupPayload } from './utils';
import { encryptedMessenger } from './utils';

export const replyConnectRequest = async (
	requestId: string,
	isApproved: boolean,
) => {
	const payload: PopupPayload = {
		from: PopupType.REQUEST_CONNECT_POPUP,
		type: RequestType.REQUEST_CONNECT,
		sourceRequestId: requestId,
		isApproved,
	};

	try {
		const res = await encryptedMessenger.request(Channels.kernel, payload);
		if (res.responseCode === ResponseCode.SUCCESS) {
			window.close();
		}
	} catch (error) {
		throw Error('Unable to handle connect request');
	}
};

export const replyLayoutInstall = async (
	requestId: string,
	isApproved: boolean,
) => {
	const payload: PopupPayload = {
		from: PopupType.REQUEST_INSTALL_LAYOUT_POPUP,
		type: RequestType.INSTALL_LAYOUT,
		sourceRequestId: requestId,
		isApproved,
	};

	try {
		return await encryptedMessenger.request(Channels.kernel, payload, 10000);
	} catch (error) {
		throw Error('Not successfully install layout');
	}
};

export const replySignature = async (
	options: PayloadOptions,
	type: RequestType,
) => {
	const payload: PopupPayload = {
		from: PopupType.SIGNATURE_POPUP,
		type,
		...options,
	};

	try {
		return await encryptedMessenger.request(Channels.kernel, payload, 10000);
	} catch (error) {
		throw Error('Unable to handle sign message request');
	}
};
