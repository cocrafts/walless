import { suiHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from '../utils/types';

type MessagePayload = {
	privateKey?: Uint8Array;
	message?: string;
};

type TransactionPayload = {
	privateKey?: Uint8Array;
	transaction?: string;
};

export const signMessage: HandleMethod<MessagePayload> = async ({
	payload,
	respond,
}) => {
	if (!payload.privateKey || !payload.message) {
		throw Error('Missing privateKey or message');
	}

	const { requestId, message, privateKey } = payload;
	const signedMessage = await suiHandler.signMessage(message, privateKey);
	respond(requestId, ResponseCode.SUCCESS, { signedMessage });
};

export const signTransaction: HandleMethod<TransactionPayload> = async ({
	payload,
	respond,
}) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const { requestId, transaction, privateKey } = payload;
	const signedTransaction = await suiHandler.signTransaction(
		transaction,
		privateKey,
	);
	respond(requestId, ResponseCode.SUCCESS, { signedTransaction });
};

export const signAndExecuteTransaction: HandleMethod<
	TransactionPayload
> = async ({ payload, respond }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const { requestId, transaction, privateKey } = payload;
	const signedTransaction = await suiHandler.signAndExecuteTransaction(
		transaction,
		privateKey,
	);
	respond(requestId, ResponseCode.SUCCESS, { signedTransaction });
};
