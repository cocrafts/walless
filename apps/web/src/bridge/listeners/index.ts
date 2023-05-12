import { type MessagePayload } from '@walless/messaging';
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
