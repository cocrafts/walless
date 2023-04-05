import { sendRequest } from '../utils/messaging';

export const requestSignAndSendTransaction = async (
	transaction: string,
	options: unknown,
) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-and-send-transaction',
		transaction,
		options,
	});
};

export const requestSignMessage = async (message: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-message',
		message,
	});
};

export const requestSignTransaction = async (transaction: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: 'sign-transaction',
		transaction,
	});
};
