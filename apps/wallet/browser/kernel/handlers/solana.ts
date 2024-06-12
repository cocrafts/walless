import type { Middleware } from '@metacraft/crab/core';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { ResponseCode } from '@walless/core';
import { solana } from '@walless/network';
import { environment } from 'utils/config';

import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

const connection = new Connection(
	environment.NETWORK_CLUSTER === 'mainnet'
		? environment.SOLANA_CLUSTER_URL
		: clusterApiUrl('devnet'),
);

export const signMessage: Middleware = async (payload, respond) => {
	if (!payload.privateKey || !payload.message) {
		throw Error('Missing privateKey or message');
	}

	const signature = await solana.signMessage(
		payload.message,
		payload.privateKey,
	);

	respond({
		signature,
		message: 'Successfully sign message',
		responseCode: ResponseCode.SUCCESS,
	});
};

export const signTransaction: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signedTransaction = await solana.signTransaction(
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signedTransaction });
};

export const signAndSendTransaction: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
	options?: solana.SignAndSendOptions;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await solana.signAndSendTransaction(
		connection,
		payload.transaction,
		payload.privateKey,
		payload.options,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const signAndSendGasilonTransaction: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await solana.signAndSendGasilonTransaction(
		environment.GASILON_ENDPOINT,
		payload.transaction,
		payload.privateKey,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
