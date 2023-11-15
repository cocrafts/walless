import type { MiniBroadcast, Networks, UnknownObject } from '@walless/core';
import type { MessagePayload, ResponseCode } from '@walless/messaging';

export type DefaultPayload = UnknownObject & MessagePayload;

export type HandleMethod<T> = (props: {
	payload: T & DefaultPayload;
	respond: ResponseMethod;
	next?: (payload: DefaultPayload) => Promise<void>;
}) => Promise<void> | void;

export type ResponseMethod = (
	to: string,
	responseCode: ResponseCode,
	responsePayload?: UnknownObject,
) => void;

export type CoordinatingHandleProps = {
	channel: MiniBroadcast;
	payload: DefaultPayload;
	handleMethod: HandleMethod<DefaultPayload>;
	requirePrivateKey: boolean;
	requireUserAction: boolean;
	network?: Networks;
};

export type CoordinatingHandle = (props: CoordinatingHandleProps) => void;

export type InstallLayoutPayload = Required<MessagePayload> & {
	id: string;
};
