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

export const constructAptosHandle =
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

export const transferCoin = constructAptosHandle(
	aptosHandler.handleTransferCoin,
);

export const transferToken = constructAptosHandle(
	aptosHandler.handleTransferToken,
);

export const claimToken = constructAptosHandle(aptosHandler.handleClaimToken);

export const updateDirectTransfer = constructAptosHandle(
	aptosHandler.handleUpdateDirectTransfer,
);
