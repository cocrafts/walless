import type { MiniBroadcast, Networks, UnknownObject } from '@walless/core';
import type { ResponseCode } from '@walless/messaging';

export type HandleMethodProps = {
	privateKey: Uint8Array;
	payload: UnknownObject;
	responseMethod: ResponseMethod;
};

export type HandleMethod = ({
	privateKey,
	payload,
	responseMethod,
}: HandleMethodProps) => void;

export type ResponseMethod = (
	to: string,
	responseCode: ResponseCode,
	responsePayload?: UnknownObject,
) => void;

export type CoordinatingHandleProps = {
	channel: MiniBroadcast;
	payload: UnknownObject;
	handleMethod: HandleMethod;
	requirePrivateKey: boolean;
	network?: Networks;
};

export type CoordinatingHandle = (props: CoordinatingHandleProps) => void;
