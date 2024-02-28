import { useEffect, useState } from 'react';
import type { UnknownObject } from '@walless/core';
import { runtime } from '@walless/core';
import type { MessagePayload } from '@walless/messaging';
import type { ConnectOptions } from '@walless/sdk';
import { getDataFromSourceRequest } from 'bridge';

export const useRequestData = (requestId: string, from: string) => {
	const [sender, setSender] = useState<UnknownObject>({});
	const [options, setOptions] = useState<ConnectOptions>({});
	const [message, setMessage] = useState('');
	const [transaction, setTransaction] = useState('');
	const [payload, setPayload] = useState<MessagePayload>();

	useEffect(() => {
		const configureSender = async () => {
			const result = await getDataFromSourceRequest(requestId, from);
			const { sender, message, transaction, options } = result ?? {};

			setPayload(result as MessagePayload);

			if (sender) {
				setSender(result.sender);
			}

			if (message) {
				setMessage(message);
			}

			if (transaction) {
				setTransaction(transaction);
			}

			if (options) {
				setOptions(options);
			}
		};

		if (runtime.isExtension) {
			configureSender();
		}
	}, [requestId]);

	return {
		...payload,
		sender,
		message,
		transaction,
		options,
	};
};
