import { Networks, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { sui, utils } from '@walless/network';
import { engine } from 'engine';
import type { SuiContext } from 'engine/runners';
import { storage } from 'utils/storage';
import type { SuiSendTokenTransaction } from 'utils/transaction/types';

import { constructSuiSendTokenTransaction } from './construct';

export const createAndSendSuiTransaction = async (
	initTransaction: SuiSendTokenTransaction,
	passcode: string,
) => {
	const res = {} as ResponsePayload;
	let privateKey: Uint8Array;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.sui, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	const { client } = engine.getContext<SuiContext>(Networks.sui);
	const transactionBlock = await constructSuiSendTokenTransaction(
		client,
		initTransaction,
	);
	const response = await sui.signAndExecuteTransaction(
		client,
		transactionBlock.serialize(),
		privateKey,
	);
	res.signatureString = response.transaction?.txSignatures;
	res.responseCode = ResponseCode.SUCCESS;

	return res;
};

export * from './construct';
export * from './fee';
