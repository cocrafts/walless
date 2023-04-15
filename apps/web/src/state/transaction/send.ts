import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import {
	BindDirections,
	constructTransaction,
	modalActions,
	modalState,
} from '@walless/app';
import { Networks } from '@walless/core';
import { ResponseCode } from '@walless/messaging';
import {
	requestSignAndExecuteTransactionBlock,
	requestSignAndSendTransaction,
} from 'bridge/listeners';
import PasscodeScreen from 'screens/Profile/modals/Passcode';
import TransactionSuccessfulScreen from 'screens/Profile/modals/TransactionSuccessful';

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
	const transaction = await constructTransaction({
		...payload,
	});

	let res;
	if (transaction instanceof VersionedTransaction) {
		res = await requestSignAndSendTransaction(transaction, null, passcode);
	} else if (transaction instanceof TransactionBlock) {
		res = await requestSignAndExecuteTransactionBlock(
			transaction,
			null,
			passcode,
		);
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
			context: {
				...payload,
			},
		});
	}

	return res;
};
