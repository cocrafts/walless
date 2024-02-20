import { RequestType, Timeout } from '@walless/core';
import type { PureMessagePayload } from '@walless/messaging';
import { Channels } from '@walless/messaging';
import * as bs58 from 'bs58';

import type { PopupPayload } from './utils';
import { encryptedMessenger } from './utils';

export const sendRequest = async (payload: PureMessagePayload) => {
	return await encryptedMessenger.request('kernel', payload);
};

export const findRequest = async (requestId: string, from: string) => {
	const payload: PopupPayload = {
		from,
		type: RequestType.REQUEST_PAYLOAD,
		sourceRequestId: requestId,
	};

	try {
		const res = await encryptedMessenger.request(
			Channels.kernel,
			payload,
			Timeout.sixtySeconds,
		);

		if ('message' in res) {
			const displayMessage = new TextDecoder().decode(bs58.decode(res.message));
			return {
				...res,
				message: displayMessage,
			};
		} else if ('transaction' in res) {
			// TODO: add transaction decode feature
			return res;
		} else {
			return res;
		}
	} catch (error) {
		throw new Error('Unable to get message or transaction');
	}
};
