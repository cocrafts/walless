import { UnknownObject } from '@walless/core';
import { ResponseCode } from '@walless/messaging';

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
