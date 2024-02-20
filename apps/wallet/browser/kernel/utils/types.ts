import type {
	MiniBroadcast,
	Networks,
	ResponseCode,
	UnknownObject,
} from '@walless/core';
import type { MessagePayload } from '@walless/messaging';

export type HandleMethod<T> = (props: {
	payload: T & MessagePayload;
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
