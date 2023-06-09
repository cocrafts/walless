import {
	type MessagePayload,
	Channels,
	PopupType,
	RequestType,
} from '@walless/messaging';
import { encryptedMessenger } from 'bridge/utils/messaging';

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
