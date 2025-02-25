import { importKey } from '@taquito/signer';
import { Networks, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { utils } from '@walless/network';
import { encode } from 'bs58';
import { engine } from 'engine';
import type { TezosContext } from 'engine/runners';
import { storage } from 'utils/storage';
import type { TezosSendTokenTransaction } from 'utils/transaction/types';

import { getTransferParams } from './internal';

export const createAndSendTezosTransaction = async (
	payload: TezosSendTokenTransaction,
	passcode: string,
) => {
	const { connection } = engine.getContext<TezosContext>(Networks.tezos);

	const res = {} as ResponsePayload;

	let privateKey;
	try {
		const decodedPrivateKey = await utils.getPrivateKey(
			storage,
			Networks.tezos,
			passcode,
		);
		privateKey = encode(decodedPrivateKey);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	await importKey(connection, privateKey);

	const transferParams = await getTransferParams(payload, connection);

	const tx = await connection.wallet.transfer(transferParams).send();

	res.signatureString = tx.opHash;
	res.isSuccessful = (await tx.confirmation())?.completed;

	res.responseCode = ResponseCode.SUCCESS;

	return res;
};
