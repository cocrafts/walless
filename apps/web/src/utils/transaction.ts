import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import {
	constructTransaction,
	constructTransactionAbstractFee,
} from '@walless/app/utils';
import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { HandleAptosFunction } from '@walless/ioc';
import type { ResponsePayload } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import { requestHandleTransaction } from 'bridge/listeners';
import { encode } from 'bs58';

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const transaction =
		payload.network === Networks.solana &&
		payload.tokenForFee.metadata?.symbol !== 'SOL'
			? await constructTransactionAbstractFee(payload)
			: await constructTransaction(payload);

	let res;

	if (transaction instanceof VersionedTransaction) {
		res =
			payload.tokenForFee.metadata?.symbol === 'SOL'
				? await requestHandleTransaction({
						type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
				  })
				: await requestHandleTransaction({
						type: RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
				  });
	} else if (transaction instanceof TransactionBlock) {
		res = await requestHandleTransaction({
			type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
			transaction: transaction.serialize(),
			passcode,
		});
	} else if (payload.network == Networks.tezos) {
		res = await requestHandleTransaction({
			type: RequestType.TRANSFER_TEZOS_TOKEN,
			transaction: JSON.stringify(transaction),
			passcode,
		});
	} else if (payload.network == Networks.aptos) {
		const isCoinTransaction = !('creator' in transaction);
		if (isCoinTransaction) {
			res = await requestHandleTransaction({
				type: RequestType.TRANSFER_COIN_ON_APTOS,
				transaction: JSON.stringify(transaction),
				passcode,
			});
		} else {
			res = await requestHandleTransaction({
				type: RequestType.TRANSFER_TOKEN_ON_APTOS,
				transaction: JSON.stringify(transaction),
				passcode,
			});
		}
	}

	return res as ResponsePayload;
};

export const handleAptosOnChainAction: HandleAptosFunction = async ({
	passcode,
	payload,
	type,
}) => {
	const res = await requestHandleTransaction({
		type,
		transaction: JSON.stringify(payload),
		passcode,
	});

	return res;
};
