import type { TransactionBlock } from '@mysten/sui.js/transactions';
import { Networks, RequestType } from '@walless/core';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';
import { solMint } from 'utils/constants';

import { constructSendTransaction } from './construct';
import type {
	SendNftTransaction,
	SendTokenTransaction,
	SendTransaction,
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
} from './types';

export const sendTransaction = async (
	initTransaction:
		| SendTransaction
		| SendTokenTransaction
		| SendNftTransaction
		| SolanaSendTokenTransaction
		| SolanaSendNftTransaction,

	passcode?: string,
) => {
	const transaction = await constructSendTransaction(initTransaction);
	if (!transaction) throw Error('failed to construct transaction');

	const { network } = initTransaction;

	switch (network) {
		case Networks.solana: {
			const { tokenForFee } = initTransaction as SolanaSendTransaction;
			const isGasilon = tokenForFee && tokenForFee.mint !== solMint;
			if (isGasilon) {
				return await sendRequest({
					type: RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA,
					transaction: encode(transaction.serialize()),
					passcode,
				});
			} else {
				return await sendRequest({
					type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
					transaction: encode(transaction.serialize()),
					passcode,
				});
			}
		}
		case Networks.sui: {
			return await sendRequest({
				type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
				transaction: (transaction as never as TransactionBlock).serialize(),
				passcode,
			});
		}
		case Networks.tezos: {
			return await sendRequest({
				type: RequestType.TRANSFER_TEZOS_TOKEN,
				transaction: JSON.stringify(transaction),
				passcode,
			});
		}
		case Networks.aptos: {
			const isCoinTransaction = !('creator' in transaction);
			if (isCoinTransaction) {
				return await sendRequest({
					type: RequestType.TRANSFER_COIN_ON_APTOS,
					transaction: JSON.stringify(transaction),
					passcode,
				});
			} else {
				return await sendRequest({
					type: RequestType.TRANSFER_TOKEN_ON_APTOS,
					transaction: JSON.stringify(transaction),
					passcode,
				});
			}
		}
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
