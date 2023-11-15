import { aptosHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from '../utils/types';

type Payload = {
	privateKey: Uint8Array;
	transaction: string;
};

export const transferCoin: HandleMethod<Payload> = ({ payload, respond }) => {
	const signatureString = aptosHandler.handleTransferCoin(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const transferToken: HandleMethod<Payload> = ({ payload, respond }) => {
	const signatureString = aptosHandler.handleTransferToken(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const claimToken: HandleMethod<Payload> = ({ payload, respond }) => {
	const signatureString = aptosHandler.handleClaimToken(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const updateDirectTransfer: HandleMethod<Payload> = ({
	payload,
	respond,
}) => {
	const signatureString = aptosHandler.handleUpdateDirectTransfer(
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
