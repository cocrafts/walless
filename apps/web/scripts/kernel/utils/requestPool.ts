import { type MiniBroadcast, type UnknownObject } from '@walless/core';

import { closePopup } from './popup';
import { type ResponseMethod } from './types';
const requestPool: Record<
	string,
	{
		channel: MiniBroadcast;
		payload: UnknownObject;
	}
> = {};

export const response: ResponseMethod = (
	to,
	responseCode,
	responsePayload = {},
) => {
	const { channel, payload } = requestPool[to];

	channel.postMessage({
		...responsePayload,
		from: 'walless@kernel',
		requestId: to,
		responseCode,
	});

	if (payload.popupId) {
		closePopup(payload.popupId);
	}

	removeRequestRecord(to);
};

export const removeRequestRecord = (requestId: string) => {
	delete requestPool[requestId];
};

export const addRequestRecord = (
	requestId: string,
	channel: MiniBroadcast,
	payload: UnknownObject,
) => {
	requestPool[requestId] = { channel, payload };
};

export const getRequestRecord = (requestId: string) => {
	return requestPool[requestId];
};
