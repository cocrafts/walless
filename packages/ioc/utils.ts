import type { Networks, TransactionPayload } from '@walless/core';
import type { RequestType, ResponsePayload } from '@walless/messaging';

export type CreateAndSendFunction = (
	payload: TransactionPayload,
) => Promise<ResponsePayload>;

export type BuyTokenFunction = (network: Networks) => void;

export type LogOutFunction = () => Promise<void>;

export type HandleAptosFunction = (params: {
	passcode: string;
	type: RequestType;
	payload: unknown;
}) => Promise<ResponsePayload>;

export type Utils = {
	createAndSend: CreateAndSendFunction;
	buyToken: BuyTokenFunction;
	logOut: LogOutFunction;
	navigateToWidget: (id: string) => void;
	handleAptosFunction: HandleAptosFunction;
};

export const utils = {} as Utils;
