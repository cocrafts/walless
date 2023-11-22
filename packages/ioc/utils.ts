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

export type NavigateToCollection = (id: string) => void;

export type NavigateToCollectible = (id: string) => void;

export type NavigateBack = () => void;

export type Utils = {
	createAndSend: CreateAndSendFunction;
	buyToken: BuyTokenFunction;
	logOut: LogOutFunction;
	navigateToWidget: (id: string) => void;
	handleAptosFunction: HandleAptosFunction;
	navigateToCollection: NavigateToCollection;
	navigateToCollectible: NavigateToCollectible;
	navigateBack: NavigateBack;
};

export const utils = {} as Utils;
