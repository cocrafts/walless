import { aptosHandler } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import { respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

type Payload = {
	privateKey?: Uint8Array;
	transaction?: string;
};

type AptosHandle = (
	privateKey: Uint8Array,
	transaction: string,
) => Promise<string>;

export const getAptosHandle =
	(handle: AptosHandle): HandleMethod<Payload> =>
	async ({ payload }) => {
		if (!payload.privateKey || !payload.transaction) {
			throw Error('Missing privateKey or transaction');
		}

		const signatureString = await handle(
			payload.privateKey,
			payload.transaction,
		);

		respond(payload.requestId, ResponseCode.SUCCESS, { signatureString });
	};

export const transferCoin = getAptosHandle(aptosHandler.handleTransferCoin);

export const transferToken = getAptosHandle(aptosHandler.handleTransferToken);

export const claimToken = getAptosHandle(aptosHandler.handleClaimToken);

export const updateDirectTransfer = getAptosHandle(
	aptosHandler.handleUpdateDirectTransfer,
);
