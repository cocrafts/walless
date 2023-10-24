import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import { constructTransaction } from '@walless/app/utils';
import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import { requestHandleTransaction } from 'bridge/listeners';
import { encode } from 'bs58';

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const transaction = await constructTransaction(payload);

	let res;
	if (transaction instanceof VersionedTransaction) {
		res = await requestHandleTransaction({
			type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
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
		res = await requestHandleTransaction({
			type: RequestType.TRANSFER_COIN_ON_APTOS,
			transaction: JSON.stringify(transaction),
			passcode,
		});
	}

	return res as ResponsePayload;
};
