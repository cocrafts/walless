import { type RequestHashmap, type UnknownObject } from '@walless/core';

let initialized = false;
let queueInterval;
const requestHashmap: RequestHashmap = {};

const runInterval = () => {
	const queueSize = Object.keys(requestHashmap).length;

	if (queueSize === 0) {
		clearInterval(queueInterval);
	}

	for (const id in requestHashmap) {
		const request = requestHashmap[id];
		const milliseconds = new Date().getTime() - request.timestamp.getTime();

		if (milliseconds > request.timeout) {
			request.reject(new Error('request timeout'));
			delete requestHashmap[id];
		}
	}
};

export const sendRequest = <T extends UnknownObject>(
	payload: UnknownObject,
	timeout = 2500,
): Promise<T> => {
	if (!initialized) initializeMessaging();

	return new Promise((resolve, reject) => {
		if (!payload.requestId) payload.requestId = crypto.randomUUID();

		requestHashmap[payload.requestId] = {
			timestamp: new Date(),
			timeout,
			resolve,
			reject,
		};

		if (Object.keys(requestHashmap).length === 1) {
			queueInterval = setInterval(runInterval, 500);
		}

		window.postMessage(payload);
	});
};

export const initializeMessaging = () => {
	initialized = true;

	window.addEventListener('message', async ({ data }) => {
		const { from, requestId } = data;

		if (from?.startsWith('walless@kernel') && requestId) {
			const associatedRequest = requestHashmap[requestId];

			if (associatedRequest) {
				associatedRequest.resolve(data);
			}
		}
	});
};
