import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import type { Networks } from '@walless/core';
import { BindDirections, modalActions, modalState } from '@walless/gui';
import { RequestType, ResponseCode } from '@walless/messaging';
import { requestHandleTransaction } from 'bridge/listeners';
import { encode } from 'bs58';
import PasscodeScreen from 'screens/Profile/modals/Passcode';
import TransactionSuccessfulScreen from 'screens/Profile/modals/TransactionSuccessful';
import { constructTransaction } from 'utils/transaction';

export interface TransactionPayload {
	sender: string;
	receiver: string;
	amount: number;
	network: Networks;
	token: string;
	passcode?: string;
}

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
	}

	if (res?.responseCode === ResponseCode.SUCCESS) {
		modalState.map.clear();
		modalActions.show({
			id: 'transaction-successfully',
			bindingDirection: BindDirections.InnerBottom,
			component: TransactionSuccessfulScreen as never,
			context: {
				...payload,
				signatureString: res.signatureString,
			},
		});
	} else if (res?.responseCode === ResponseCode.REQUIRE_PASSCODE) {
		modalState.map.clear();
		modalActions.show({
			id: 'confirm-transaction-with-passcode',
			bindingDirection: BindDirections.InnerBottom,
			component: PasscodeScreen as never,
			context: payload,
		});
	}

	return res;
};
