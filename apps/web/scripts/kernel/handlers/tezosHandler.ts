import { importKey } from '@taquito/signer';
import { type TezosToolkit } from '@taquito/taquito';
import { type TezosTransaction, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import {
	type MessengerCallback,
	type ResponsePayload,
	ResponseCode,
} from '@walless/messaging';
import { encode } from 'bs58';

import { getPrivateKey, settings } from '../utils/handler';

export const handleTransferToken: MessengerCallback = async (
	payload,
	channel,
) => {
	const responsePayload: ResponsePayload = {
		from: 'walless@kernel',
		requestId: payload.requestId,
		responseCode: ResponseCode.SUCCESS,
	};

	if (settings.requirePasscode && !payload.passcode) {
		responsePayload.responseCode = ResponseCode.REQUIRE_PASSCODE;

		return channel.postMessage(responsePayload);
	}

	let privateKey;
	try {
		privateKey = encode(
			await getPrivateKey(Networks.tezos, payload.passcode as string),
		);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}

	const tezos: TezosToolkit = modules.engine.getConnection(Networks.tezos);

	try {
		await importKey(tezos, privateKey);
		const transaction: TezosTransaction = JSON.parse(
			payload.transaction as string,
		);

		console.log({ transaction });
		if (transaction.type === 'native') {
			const op = await tezos.contract.transfer({
				to: transaction.receiver,
				amount: transaction.amount,
			});

			responsePayload.hash = await op.confirmation(1).then(() => op.hash);
		} else {
			throw Error('Not support this token');
		}
	} catch (error) {
		console.log({ error });
		responsePayload.responseCode = ResponseCode.ERROR;
		responsePayload.message = (error as Error).message;
	}

	return channel.postMessage(responsePayload);
};
