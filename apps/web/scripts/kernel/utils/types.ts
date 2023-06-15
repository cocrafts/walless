import { type UnknownObject } from '@walless/core';
import { type ResponseCode } from '@walless/messaging';

export type HandleProps = {
	privateKey: Uint8Array;
	payload: UnknownObject;
	responseMethod: ResponseMethod;
};

export type HandleMethod = ({
	privateKey,
	payload,
	responseMethod,
}: HandleProps) => void;

export type ResponseMethod = (
	to: string,
	responseCode: ResponseCode,
	responsePayload?: UnknownObject,
) => void;
