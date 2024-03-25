import { RequestType } from '@walless/core';
import { solana } from '@walless/network';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';
import { solMint } from 'utils/constants';

import {
	constructSolanaSendNftTransaction,
	constructSolanaSendTokenTransaction,
} from './construct';
import type {
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
} from './types';

export const createAndSendSolanaTransaction = async (
	initTransaction: SolanaSendTokenTransaction | SolanaSendNftTransaction,
	passcode: string,
) => {
	const { type } = initTransaction;
	let transaction;
	if (type === 'token') {
		transaction = await constructSolanaSendTokenTransaction(
			initTransaction as SolanaSendTokenTransaction,
		);
	} else {
		transaction = await constructSolanaSendNftTransaction(
			initTransaction as SolanaSendNftTransaction,
		);
	}
	if (!transaction) throw Error('failed to construct transaction');
	transaction = solana.withSetComputeUnitLimit(transaction);

	const { tokenForFee } = initTransaction as SolanaSendTransaction;
	const isGasilon = tokenForFee && tokenForFee.mint !== solMint;
	if (isGasilon) {
		return await sendRequest({
			type: RequestType.SIGN_GASILON_TRANSACTION_ON_SOLANA,
			transaction: encode(transaction.serialize()),
			passcode,
		});
	} else {
		return await sendRequest(
			{
				type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
				transaction: encode(transaction.serialize()),
				passcode,
			},
			1000 * 60 * 5,
		);
	}
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
