import { ResponseCode } from '@walless/core';
import { aptos } from '@walless/network';
import { Network, Provider } from 'aptos';

import { environment } from '../utils/config';
import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

const provider = new Provider(
	environment.NETWORK_CLUSTER === 'mainnet' ? Network.MAINNET : Network.DEVNET,
);

type Payload = {
	privateKey?: Uint8Array;
	transaction?: string;
};

export const transferCoin: HandleMethod<Payload> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptos.handleTransferCoin(
		provider,
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const transferToken: HandleMethod<Payload> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptos.handleTransferToken(
		provider,
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const claimToken: HandleMethod<Payload> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await aptos.handleClaimToken(
		provider,
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

	const signatureString = await aptos.handleUpdateDirectTransfer(
		provider,
		payload.privateKey,
		payload.transaction,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
