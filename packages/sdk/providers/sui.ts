import { RequestType } from '@walless/core';

import { sendRequest } from '../utils/messaging';

export const requestSignAndExecuteTransactionBlock = async (
	transaction: string,
	options: unknown,
) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
		transaction,
		options,
	});
};

export const requestSignMessage = async (message: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.SIGN_MESSAGE_ON_SUI,
		message,
	});
};

export const requestSignTransactionBlock = async (transaction: string) => {
	return await sendRequest({
		from: 'walless@sdk',
		type: RequestType.SIGN_TRANSACTION_ON_SUI,
		transaction,
	});
};
