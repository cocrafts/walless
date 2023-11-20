import type { MiniBroadcast } from '@walless/core';
import type { MessagePayload } from '@walless/messaging';

import type { ResponseMethod } from './types';

// need to handle clean up timeout request in this pool
export const requestPool: Record<
	string,
	{
		channel: MiniBroadcast;
		payload: MessagePayload;
	}
> = {};

export const respond: ResponseMethod = (
	to,
	responseCode,
	responsePayload = {},
) => {
	if (!requestPool[to]) throw Error('Request not found');
	const request = requestPool[to];
	const { channel } = request;

	channel.postMessage({
		...responsePayload,
		from: 'walless@kernel',
		requestId: to,
		responseCode,
	});

	removeRequestRecord(to);
};

export const removeRequestRecord = (requestId: string) => {
	delete requestPool[requestId];
};

export const addRequestRecord = (
	requestId: string,
	channel: MiniBroadcast,
	payload: MessagePayload,
) => {
	payload['timestamp'] = Date.now();
	requestPool[requestId] = { channel, payload };
};

export const getRequestRecord = (requestId: string) => {
	return requestPool[requestId];
};
