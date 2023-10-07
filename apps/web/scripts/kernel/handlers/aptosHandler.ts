import { getAptosConnection } from '@walless/engine/crawlers/aptos/utils';
import { ResponseCode } from '@walless/messaging';
import {
	APTOS_COIN,
	AptosAccount,
	CoinClient,
	FungibleAssetClient,
	HexString,
	TokenClient,
} from 'aptos';

import type { HandleMethod } from '../utils/types';

export const handleTransferCoin: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	try {
		const txData = JSON.parse(payload.transaction as string);

		const fromPubkey = new HexString(txData.from as string);
		const toPubkey = new HexString(txData.to as string);
		const fromAccount = new AptosAccount(privateKey, fromPubkey);
		const isNativeAPT = txData.token === APTOS_COIN;
		const connection = await getAptosConnection();

		let txHash: string;

		if (isNativeAPT) {
			const coinClient = new CoinClient(connection.aptosClient);
			txHash = await coinClient.transfer(
				fromAccount,
				toPubkey,
				txData.amount * 10 ** txData.decimals,
				{
					createReceiverIfMissing: true,
				},
			);
			await connection.waitForTransaction(txHash);
		} else {
			const token = new HexString(txData.token as string);
			const fungibleClient = new FungibleAssetClient(connection);
			txHash = await fungibleClient.transfer(
				fromAccount,
				token,
				toPubkey,
				txData.amount * 10 ** txData.decimals,
			);
			await connection.waitForTransaction(txHash);
		}

		responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
			signatureString: txHash,
		});
	} catch (error) {
		console.log({ error });
		responseMethod(payload.requestId as string, ResponseCode.ERROR, {
			error,
		});
	}
};

export const handleUpdateDirectTransfer: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	try {
		const txData = JSON.parse(payload.transaction as string);
		const directTransfer = txData.directTransfer as boolean;
		const pubkey = new HexString(txData.pubkey as string);
		const account = new AptosAccount(privateKey, pubkey);

		const connection = await getAptosConnection();
		const tokenClient = new TokenClient(connection.aptosClient);

		const txHash = await tokenClient.optInTokenTransfer(
			account,
			directTransfer,
		);
		await connection.waitForTransaction(txHash);

		responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
			signatureString: txHash,
		});
	} catch (error) {
		console.log({ error });
		responseMethod(payload.requestId as string, ResponseCode.ERROR, {
			error,
		});
	}
};

export const handleClaimToken: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	try {
		const txData = JSON.parse(payload.transaction as string);
		const pubkey = new HexString(txData.pubkey as string);
		const account = new AptosAccount(privateKey, pubkey);
		const sender = new HexString(txData.sender as string);
		const creator = new HexString(txData.creator as string);
		const collectionName = txData.collectionName as string;
		const name = txData.name as string;

		const connection = await getAptosConnection();
		const tokenClient = new TokenClient(connection.aptosClient);

		const txHash = await tokenClient.claimToken(
			account,
			sender,
			creator,
			collectionName,
			name,
		);
		await connection.waitForTransaction(txHash);

		responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
			signatureString: txHash,
		});
	} catch (error) {
		console.log({ error });
		responseMethod(payload.requestId as string, ResponseCode.ERROR, {
			error,
		});
	}
};
