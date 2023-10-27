import type { Networks, TransactionPayload } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';

export type CreateAndSendFunction = (
	payload: TransactionPayload,
) => Promise<ResponsePayload>;

export type BuyTokenFunction = (network: Networks) => void;
export type LogOutFunction = () => Promise<void>;

export type Utils = {
	createAndSend: CreateAndSendFunction;
	buyToken: BuyTokenFunction;
	logOut: LogOutFunction;
};

export const utils = {} as Utils;
