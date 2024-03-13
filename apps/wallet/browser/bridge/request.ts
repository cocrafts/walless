import { PopupType, RequestType, ResponseCode, Timeout } from '@walless/core';
import type { PureMessagePayload, ResponsePayload } from '@walless/messaging';
import { Channels } from '@walless/messaging';
import * as bs58 from 'bs58';

import type { PayloadOptions, PopupPayload } from './utils';
import { encryptedMessenger } from './utils';

export const sendRequest = async (
	payload: PureMessagePayload,
	timeout?: number,
) => {
	return (await encryptedMessenger.request(
		'kernel',
		payload,
		timeout,
	)) as ResponsePayload;
};

export const handleRequestConnect = async (
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

export const handleRequestInstallLayout = async (
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

export const handleRequestSignature = async (
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

export const getDataFromSourceRequest = async (
	requestId: string,
	from: string,
) => {
	const payload: PopupPayload = {
		from,
		type: RequestType.REQUEST_PAYLOAD,
		sourceRequestId: requestId,
	};

	try {
		const res = await encryptedMessenger.request(
			Channels.kernel,
			payload,
			Timeout.sixtySeconds,
		);

		if ('message' in res) {
			let displayMessage;
			try {
				displayMessage = new TextDecoder().decode(bs58.decode(res.message));
			} catch {
				displayMessage = res.message;
			}

			return {
				...res,
				message: displayMessage,
			};
		} else if ('transaction' in res) {
			// TODO: add transaction decode feature
			return res;
		} else {
			return res;
		}
	} catch (error) {
		throw new Error('Unable to get message or transaction');
	}
};
