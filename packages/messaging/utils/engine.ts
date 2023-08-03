import type { RequestMetadata } from './types';

export const requestEngine: Record<string, RequestMetadata> = {};

export const makeRequestMetadata = (): RequestMetadata => {
	return {} as never;
};

export const registerRequest = (meta: RequestMetadata) => {
	requestEngine[meta.id] = meta;
};

setInterval(() => {
	Object.keys(requestEngine).forEach((id) => {
		const { timestamp, timeout = 10000, reject } = requestEngine[id];
		const milliseconds = new Date().getTime() - timestamp.getTime();

		if (milliseconds > timeout) {
			reject(new Error('Request timeout'));
		}
	});
}, 1000);
