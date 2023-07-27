import { useEffect, useState } from 'react';
import type { UnknownObject } from '@walless/core';
import type { MessagePayload } from '@walless/messaging';
import { getDataFromSourceRequest } from 'bridge/listeners';

export const useRequestData = (requestId: string) => {
	const [sender, setSender] = useState<UnknownObject>({});
	const [message, setMessage] = useState('');
	const [transaction, setTransaction] = useState('');
	const [payload, setPayload] = useState<MessagePayload>();

	useEffect(() => {
		const configureSender = async () => {
			const result = await getDataFromSourceRequest(requestId);
			const { sender, message, transaction } = result ?? {};

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
		};

		configureSender();
	}, [requestId]);

	return {
		...payload,
		sender,
		message,
		transaction,
	};
};
