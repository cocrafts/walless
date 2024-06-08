import type { RequestType } from '@walless/core';
import { sendRequest } from 'bridge';

export const handleAptosOnChainAction = async ({
	passcode,
	payload,
	type,
}: {
	passcode: string;
	type: RequestType;
	payload: unknown;
}) => {
	const res = await sendRequest({
		type,
		transaction: JSON.stringify(payload),
		passcode,
	});

	return res;
};
