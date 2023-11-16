import type { UnknownObject } from '@walless/core';
import type { MessagePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';

import { respond } from './requestPool';
import type { HandleMethod } from './types';

export const handle = (payload: MessagePayload) => {
	const execute = async (handles: HandleMethod<UnknownObject>[]) => {
		if (handles.length === 0) throw Error('No handler provided');

		const [currentHandle, ...restHandles] = handles;

		const next =
			restHandles.length > 0 ? () => execute(restHandles) : undefined;
		try {
			await currentHandle({ payload, next });
		} catch (error) {
			respond(payload.requestId, ResponseCode.ERROR, { error });
		}
	};

	return { execute };
};
