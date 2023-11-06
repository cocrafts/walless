import { aptosHandlers } from '@walless/kernel';
import { ResponseCode } from '@walless/messaging';

import type { HandleMethod } from '../utils/types';

type KernelMethod = (
	privateKey: Uint8Array,
	transaction: string,
) => Promise<string>;

const constructHandleMethod =
	(kernelMethod: KernelMethod): HandleMethod =>
	async ({ privateKey, payload, responseMethod }) => {
		try {
			const txHash = await kernelMethod(privateKey, payload.transaction);
			responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
				signatureString: txHash,
			});
		} catch (error) {
			responseMethod(payload.requestId as string, ResponseCode.ERROR, {
				error,
			});
		}
	};

export const handleTransferCoin = constructHandleMethod(
	aptosHandlers.handleTransferCoin,
);

export const handleTransferToken = constructHandleMethod(
	aptosHandlers.handleTransferToken,
);

export const handleClaimToken = constructHandleMethod(
	aptosHandlers.handleClaimToken,
);

export const handleUpdateDirectTransfer = constructHandleMethod(
	aptosHandlers.handleUpdateDirectTransfer,
);
