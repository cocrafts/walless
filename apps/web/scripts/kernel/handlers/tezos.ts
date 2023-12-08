import { signMessage as tzSignMessage } from '@airgap/beacon-utils';
import { tezosHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

export const signPayload: HandleMethod<{
	privateKey?: Uint8Array;
	payload?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.payload) {
		throw Error('Missing privateKey or message');
	}

	const signature = await tzSignMessage(payload.payload as string, {
		secretKey: Buffer.from(payload.privateKey),
	});

	respond(payload.requestId, ResponseCode.SUCCESS, { signature });
};

export const transferToken: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const hash = await tezosHandler.transferToken(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { hash });
};
