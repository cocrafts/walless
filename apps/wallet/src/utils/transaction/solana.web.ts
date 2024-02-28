import type { VersionedTransaction } from '@solana/web3.js';
import { RequestType } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import type { solanaHandler } from '@walless/network';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';

export const signAndSendTransaction = async (
	transaction: VersionedTransaction,
	passcode: string,
	options?: solanaHandler.SignAndSendOptions,
): Promise<ResponsePayload> => {
	const res = await sendRequest({
		type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
		transaction: encode(transaction.serialize()),
		passcode,
		options,
	});

	return res as ResponsePayload;
};
