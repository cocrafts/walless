import type { Networks, TransactionPayload } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';

export type CreateAndSendFunction = (
	payload: TransactionPayload,
) => Promise<ResponsePayload>;

export type BuyTokenFunction = (network: Networks) => void;

export type LogOutFunction = () => Promise<void>;

export type HandleAptosFunction = (
	passcode: string,
	payload: unknown,
	callback: (privateKey: Uint8Array, payload: unknown) => Promise<string>,
) => Promise<ResponsePayload>;

export type Utils = {
	createAndSend: CreateAndSendFunction;
	buyToken: BuyTokenFunction;
	logOut: LogOutFunction;
	handleAptosFunction: HandleAptosFunction;
};

export const utils = {} as Utils;
