import type { Networks } from '@walless/core';
import { utils } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from './types';

export const getPrivateKeyHandle = (
	network: Networks,
): HandleMethod<{ passcode: string }> => {
	return async ({ payload, respond, next }) => {
		const passcode = payload.passcode;
		if (!passcode) {
			respond(payload.requestId, ResponseCode.REQUIRE_PASSCODE);
		}

		try {
			const privateKey = await utils.getPrivateKey(network, passcode);
			next?.({ ...payload, privateKey });
		} catch {
			respond(payload.requestId, ResponseCode.WRONG_PASSCODE);
		}
	};
};
