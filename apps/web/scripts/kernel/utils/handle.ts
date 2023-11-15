import type { UnknownObject } from '@walless/core';
import type { MessagePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';

import { respond } from './requestPool';
import type { HandleMethod } from './types';

export const handle = async (
	payload: MessagePayload,
	...args: HandleMethod<UnknownObject>[]
) => {
	if (args.length === 0) throw Error('No handler provided');

	const [currentHandle, ...restHandles] = args;

	const next =
		restHandles.length > 0
			? (payload: MessagePayload) => handle(payload, ...restHandles)
			: undefined;

	try {
		await currentHandle({ payload, respond, next });
	} catch (error) {
		respond(payload.requestId, ResponseCode.ERROR, { error });
	}
};
