import { aptosHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

type Payload = {
	privateKey?: Uint8Array;
	transaction?: string;
};

export const transferCoin: HandleMethod<Payload> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptosHandler.handleTransferCoin(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const transferToken: HandleMethod<Payload> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptosHandler.handleTransferToken(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const claimToken: HandleMethod<Payload> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptosHandler.handleClaimToken(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const updateDirectTransfer: HandleMethod<Payload> = async ({
	payload,
}) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptosHandler.handleUpdateDirectTransfer(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
