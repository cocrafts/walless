import {
	type MessagePayload,
	Channels,
	PopupType,
	RequestType,
} from '@walless/messaging';
import { encryptedMessenger } from 'bridge/utils/messaging';
import { type PayloadOptions } from 'screens/Request/shared';

export const registerMessageHandlers = async () => {
	// Empty for now
};

export const requestHandleTransaction = async (payload: MessagePayload) => {
	try {
		return await encryptedMessenger.request('kernel', payload);
	} catch (error) {
		return {
			message: (error as Error).message,
		};
	}
};

export const handleRequestConnect = async (
	requestId: string,
	isApproved: boolean,
) => {
	const payload: MessagePayload = {
		from: PopupType.REQUEST_CONNECT_POPUP,
		type: RequestType.RESOLVE_REQUEST_CONNECT,
		requestId,
		isApproved,
	};

	try {
		encryptedMessenger.send(Channels.kernel, payload);
	} catch (error) {
		throw Error('Unable to handle connect request');
	}
};

export const handleRequestSignMessage = async (options: PayloadOptions) => {
	const payload: MessagePayload = {
		from: PopupType.SIGN_MESSAGE_POPUP,
		type: RequestType.RESOLVE_REQUEST_SIGN_MESSAGE,
		...options,
	};

	try {
		return await encryptedMessenger.request(Channels.kernel, payload, 10000);
	} catch (error) {
		throw Error('Unable to handle sign message request');
	}
};
