import type { VersionedTransaction } from '@solana/web3.js';
import { RequestType } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';

export const signAndSendTransaction = async (
	transaction: VersionedTransaction,
	passcode: string,
): Promise<ResponsePayload> => {
	const res = await sendRequest({
		type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
		transaction: encode(transaction.serialize()),
		passcode,
	});

	return res as ResponsePayload;
};
