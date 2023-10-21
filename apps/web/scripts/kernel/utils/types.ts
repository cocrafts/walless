import type { MiniBroadcast, Networks, UnknownObject } from '@walless/core';
import type { MessagePayload, ResponseCode } from '@walless/messaging';

export type HandleMethodProps = {
	privateKey: Uint8Array;
	payload: UnknownObject;
	responseMethod: ResponseMethod;
};

export type HandleMethod = (props: HandleMethodProps) => void;

export type ResponseMethod = (
	to: string,
	responseCode: ResponseCode,
	responsePayload?: UnknownObject,
) => void;

export type CoordinatingHandleProps = {
	channel: MiniBroadcast;
	payload: UnknownObject | MessagePayload;
	handleMethod: HandleMethod;
	requirePrivateKey: boolean;
	requireUserAction: boolean;
	network?: Networks;
};

export type CoordinatingHandle = (props: CoordinatingHandleProps) => void;

export type InstallLayoutPayload = Required<MessagePayload> & {
	id: string;
};
