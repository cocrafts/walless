import type { VersionedTransaction } from '@solana/web3.js';
import { RequestType } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import type { solana } from '@walless/network';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';

export const signAndSendTransaction = async (
	transaction: VersionedTransaction,
	passcode: string,
	options?: solana.SignAndSendOptions,
	timeout?: number,
): Promise<ResponsePayload> => {
	const res = await sendRequest(
		{
			type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
			transaction: encode(transaction.serialize()),
			passcode,
			options,
		},
		timeout,
	);

	return res as ResponsePayload;
};
