import { ResponseCode } from '@walless/messaging';

import { respond } from './requestPool';
import type { DefaultPayload, HandleMethod } from './types';

export const handle = async (
	payload: DefaultPayload,
	...args: HandleMethod<DefaultPayload>[]
) => {
	if (args.length === 0) throw new Error('No handler provided');

	const [currentHandle, ...restHandles] = args;

	const next =
		restHandles.length > 0
			? (payload: DefaultPayload) => handle(payload, ...restHandles)
			: undefined;

	try {
		await currentHandle({ payload, respond, next });
	} catch (error) {
		respond(payload.requestId, ResponseCode.ERROR, { error });
	}
};
