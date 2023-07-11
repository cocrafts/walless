import type { MessagePayload } from '@walless/messaging';
import { Channels, PopupType, RequestType } from '@walless/messaging';
import { encryptedMessenger } from 'bridge/utils/messaging';
import * as bs58 from 'bs58';
import type { PayloadOptions } from 'screens/Request/shared';

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
	const payload = {
		from: PopupType.REQUEST_CONNECT_POPUP,
		type: RequestType.REQUEST_CONNECT,
		sourceRequestId: requestId,
		isApproved,
	};

	try {
		encryptedMessenger.request(Channels.kernel, payload);
	} catch (error) {
		throw Error('Unable to handle connect request');
	}
};

export const handleRequestSignature = async (
	options: PayloadOptions,
	type: RequestType,
) => {
	const payload = {
		from: PopupType.SIGNATURE_POPUP,
		type,
		...options,
	};

	try {
		return await encryptedMessenger.request(Channels.kernel, payload, 10000);
	} catch (error) {
		throw Error('Unable to handle sign message request');
	}
};

export const getMessageOrTransaction = async (requestId: string) => {
	const payload = {
		from: PopupType.SIGNATURE_POPUP,
		type: RequestType.REQUEST_PAYLOAD,
		sourceRequestId: requestId,
	};

	try {
		const res = await encryptedMessenger.request(
			Channels.kernel,
			payload,
			60000,
		);

		if ('message' in res) {
			const displayMessage = new TextDecoder().decode(bs58.decode(res.message));
			return {
				...res,
				message: displayMessage,
			};
		} else if ('transaction' in res) {
			return res;
		}
	} catch (error) {
		throw new Error('Unable to get message or transaction');
	}
};
