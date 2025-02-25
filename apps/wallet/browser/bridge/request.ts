import { ChromeChannel } from '@metacraft/crab/chrome';
import type { RawRequest, Response } from '@metacraft/crab/core';
import type { UnknownObject } from '@walless/core';
import { PopupType, RequestType, Timeout } from '@walless/core';
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
	resolveId: string,
	isApproved: boolean,
) => {
	const payload: RawRequest = {
		from: PopupType.REQUEST_CONNECT_POPUP,
		type: RequestType.REQUEST_CONNECT as never,
		resolveId: resolveId,
		isApproved,
	};

	try {
		const chromeChannel = new ChromeChannel(Channels.popup);
		const res = await chromeChannel.request<Response<UnknownObject>>(
			payload,
			Timeout.sixtySeconds,
		);
		if (res.error) {
			throw Error(res.error);
		} else {
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

export const handleRequestSignature = async (options: PayloadOptions) => {
	const { sourceRequestId } = options;
	const payload: RawRequest = {
		from: PopupType.SIGNATURE_POPUP,
		type: RequestType.RESOLVE_REQUEST_SIGNATURE as never,
		resolveId: sourceRequestId,
		...options,
	};

	try {
		const chromeChannel = new ChromeChannel(Channels.popup);
		const res = await chromeChannel.request<Response<UnknownObject>>(
			payload,
			Timeout.sixtySeconds,
		);
		return res;
	} catch (error) {
		throw Error('Unable to handle sign message request');
	}
};

export const getDataFromSourceRequest = async (
	resolveId: string,
	from: string,
) => {
	const payload: RawRequest = {
		from,
		type: RequestType.REQUEST_PAYLOAD as never,
		resolveId: resolveId,
	};

	try {
		const chromeChannel = new ChromeChannel(Channels.popup);
		const res = await chromeChannel.request<Response<UnknownObject>>(
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
