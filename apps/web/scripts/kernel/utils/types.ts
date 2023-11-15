import type { MiniBroadcast, Networks, UnknownObject } from '@walless/core';
import type { MessagePayload, ResponseCode } from '@walless/messaging';

export type HandleMethod<T> = (props: {
	payload: T & MessagePayload;
	respond: ResponseMethod;
	next?: (payload: MessagePayload) => Promise<void>;
}) => Promise<void> | void;

export type ResponseMethod = (
	to: string,
	responseCode: ResponseCode,
	responsePayload?: UnknownObject,
) => void;

export type CoordinatingHandleProps = {
	channel: MiniBroadcast;
	payload: MessagePayload;
	handleMethod: HandleMethod<MessagePayload>;
	requirePrivateKey: boolean;
	requireUserAction: boolean;
	network?: Networks;
};

export type CoordinatingHandle = (props: CoordinatingHandleProps) => void;
