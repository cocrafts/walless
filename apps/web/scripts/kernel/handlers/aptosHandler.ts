import type { AptosTransaction } from '@walless/core';
import { Networks } from '@walless/core';
import { APTOS_DEVNET } from '@walless/engine/aptos/shared';
import type { MessengerCallback, ResponsePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';
import { AptosAccount, AptosClient, CoinClient, HexString } from 'aptos';

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
		privateKey = await getPrivateKey(
			Networks.aptos,
			payload.passcode as string,
		);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}

	const transaction = JSON.parse(payload.transaction) as AptosTransaction;
	const { type, sender, receiver, amount } = transaction;
	const account = new AptosAccount(privateKey, new HexString(sender));
	const receiverPubkey = new HexString(receiver);

	const aptosClient = new AptosClient(APTOS_DEVNET);

	try {
		if (type === 'native') {
			const coinClient = new CoinClient(aptosClient);

			const balance = await coinClient.checkBalance(account);

			console.log('--> balance', balance);

			const txHash = await coinClient.transfer(
				account,
				receiverPubkey.hex(),
				amount * 10 ** 8,
			);

			responsePayload.hash = txHash;
		} else {
			throw Error('Not support this token');
		}
	} catch (error) {
		console.log({ error });
		responsePayload.responseCode = ResponseCode.ERROR;
		responsePayload.message = (error as Error).message;
	}
};
