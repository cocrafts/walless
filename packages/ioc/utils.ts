import type { TransactionPayload } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';

export type CreateAndSendFunction = (
	payload: TransactionPayload,
) => Promise<ResponsePayload>;

export type Utils = {
	createAndSend: CreateAndSendFunction;
};

export const utils = {} as Utils;
