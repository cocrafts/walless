import { solanaHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from '../utils/types';

export const signMessageHandle: HandleMethod<{
	privateKey: Uint8Array;
	message: string;
}> = async ({ payload, respond }) => {
	const signature = solanaHandler.signMessage(
		payload.message,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signature });
};

export const signTransactionHandle: HandleMethod<{
	privateKey: Uint8Array;
	transaction: string;
}> = async ({ payload, respond }) => {
	const signedTransaction = await solanaHandler.signTransaction(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signedTransaction });
};

export const signAndSendTransactionHandle: HandleMethod<{
	privateKey: Uint8Array;
	transaction: string;
}> = async ({ payload, respond }) => {
	const signatureString = await solanaHandler.signAndSendTransaction(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const signTransactionAbstractionFeeHandle: HandleMethod<{
	privateKey: Uint8Array;
	transaction: string;
}> = async ({ payload, respond }) => {
	const signatureString =
		await solanaHandler.signAndSendAbstractionFeeTransaction(
			payload.transaction,
			payload.privateKey,
		);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
