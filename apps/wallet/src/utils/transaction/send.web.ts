import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';

import {
	constructTransaction,
	constructTransactionAbstractFee,
} from './common';

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const transaction =
		payload.network === Networks.solana &&
		payload.tokenForFee.metadata?.symbol === 'SOL'
			? await constructTransaction(payload)
			: await constructTransactionAbstractFee(payload);

	let res;

	if (transaction instanceof VersionedTransaction) {
		res =
			payload.tokenForFee.metadata?.symbol === 'SOL'
				? await sendRequest({
						type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
					})
				: await sendRequest({
						type: RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
					});
	} else if (transaction instanceof TransactionBlock) {
		res = await sendRequest({
			type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
			transaction: transaction.serialize(),
			passcode,
		});
	} else if (payload.network == Networks.tezos) {
		res = await sendRequest({
			type: RequestType.TRANSFER_TEZOS_TOKEN,
			transaction: JSON.stringify(transaction),
			passcode,
		});
	} else if (payload.network == Networks.aptos) {
		const isCoinTransaction = !('creator' in transaction);
		if (isCoinTransaction) {
			res = await sendRequest({
				type: RequestType.TRANSFER_COIN_ON_APTOS,
				transaction: JSON.stringify(transaction),
				passcode,
			});
		} else {
			res = await sendRequest({
				type: RequestType.TRANSFER_TOKEN_ON_APTOS,
				transaction: JSON.stringify(transaction),
				passcode,
			});
		}
	}

	return res as ResponsePayload;
};

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
