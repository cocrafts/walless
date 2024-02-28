import { clusterApiUrl, Connection } from '@solana/web3.js';
import { ResponseCode } from '@walless/core';
import { solanaHandler } from '@walless/network';
import { environment } from 'utils/config';

import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

const connection = new Connection(
	__DEV__ ? clusterApiUrl('devnet') : environment.SOLANA_CLUSTER_URL,
);

export const signMessage: HandleMethod<{
	privateKey?: Uint8Array;
	message?: string;
}> = async ({ payload }) => {
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
}> = async ({ payload }) => {
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
	options?: solanaHandler.SignAndSendOptions;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString = await solanaHandler.signAndSendTransaction(
		connection,
		payload.transaction,
		payload.privateKey,
		payload.options,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};

export const signTransactionAbstractionFee: HandleMethod<{
	privateKey?: Uint8Array;
	transaction?: string;
}> = async ({ payload }) => {
	if (!payload.privateKey || !payload.transaction) {
		throw Error('Missing privateKey or transaction');
	}

	const signatureString =
		await solanaHandler.signAndSendTransactionAbstractionFee(
			environment.GASILON_ENDPOINT,
			payload.transaction,
			payload.privateKey,
		);

	respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
};
