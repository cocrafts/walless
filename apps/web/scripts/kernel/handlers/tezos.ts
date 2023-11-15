import { tezosHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from '../utils/types';

export const transferToken: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload, respond }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const hash = await tezosHandler.transferToken(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { hash });
};
