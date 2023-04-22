import { MessagePayload, RequestType } from '@walless/messaging';
import { encryptedMessenger } from 'bridge/utils/messaging';

export const registerMessageHandlers = async () => {
	setTimeout(async () => {
		await encryptedMessenger.send('kernel', {
			type: RequestType.NOTIFY_WALLET_OPEN,
		});
	}, 50);
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
