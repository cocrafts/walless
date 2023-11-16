import { solanaHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from '../utils/types';

export const signMessage: HandleMethod<{
	privateKey?: Uint8Array;
	message?: string;
}> = async ({ payload, respond }) => {
	if (!payload.privateKey || !payload.message) {
		throw Error('Missing privateKey or message');
	}

	const signature = await solanaHandler.signMessage(
		payload.message,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signature });
};

export const signTransaction: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload, respond }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signedTransaction = await solanaHandler.signTransaction(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signedTransaction });
};

export const signAndSendTransaction: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload, respond }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await solanaHandler.signAndSendTransaction(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const signTransactionAbstractionFee: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload, respond }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString =
		await solanaHandler.signAndSendAbstractionFeeTransaction(
			payload.transaction,
			payload.privateKey,
		);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
