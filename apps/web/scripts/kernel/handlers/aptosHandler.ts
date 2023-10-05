import { Networks } from '@walless/core';
import { getAptosConnection } from '@walless/engine/crawlers/aptos/utils';
import type { ResponsePayload } from '@walless/messaging';
import { type MessengerCallback, ResponseCode } from '@walless/messaging';
import {
	APTOS_COIN,
	AptosAccount,
	CoinClient,
	FungibleAssetClient,
	HexString,
} from 'aptos';

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

	try {
		const txData = JSON.parse(payload.transaction as string);
		const fromPubkey = new HexString(txData.from as string);
		const toPubkey = new HexString(txData.to as string);
		const fromAccount = new AptosAccount(privateKey, fromPubkey);
		const isNativeAPT = txData.token === APTOS_COIN;
		const connection = await getAptosConnection();

		if (isNativeAPT) {
			const coinClient = new CoinClient(connection.aptosClient);
			const txHash = await coinClient.transfer(
				fromAccount,
				toPubkey,
				txData.amount * 10 ** txData.decimals,
			);
			await connection.waitForTransaction(txHash);
			responsePayload.hash = txHash;
		} else {
			const token = new HexString(txData.token as string);
			const fungibleClient = new FungibleAssetClient(connection);
			const txHash = await fungibleClient.transfer(
				fromAccount,
				token,
				toPubkey,
				txData.amount * 10 ** txData.decimals,
			);
			await connection.waitForTransaction(txHash);
			responsePayload.hash = txHash;
		}
	} catch (error) {
		console.log({ error });
		responsePayload.responseCode = ResponseCode.ERROR;
		responsePayload.message = (error as Error).message;
	}

	return channel.postMessage(responsePayload);
};
