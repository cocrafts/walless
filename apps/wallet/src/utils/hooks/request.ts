import { useEffect, useState } from 'react';
import type { Networks, UnknownObject } from '@walless/core';
import { runtime } from '@walless/core';
import type { MessagePayload } from '@walless/messaging';
import type { ConnectOptions } from '@walless/sdk';
import { getDataFromSourceRequest } from 'bridge';

export const useRequestData = (resolveId: string, from: string) => {
	const [sender, setSender] = useState<UnknownObject>({});
	const [options, setOptions] = useState<ConnectOptions>({});
	const [message, setMessage] = useState('');
	const [transaction, setTransaction] = useState('');
	const [payload, setPayload] = useState<MessagePayload>();
	const [network, setNetwork] = useState<Networks>();

	useEffect(() => {
		const configureSender = async () => {
			const result = await getDataFromSourceRequest(resolveId, from);
			const { sender, message, transaction, options, network } = result ?? {};

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

			if (network) {
				setNetwork(network);
			}
		};

		if (runtime.isExtension) {
			configureSender();
		}
	}, [resolveId]);

	return {
		...payload,
		sender,
		message,
		transaction,
		options,
		network,
	};
};
