import { getAptosConnection } from '@walless/engine/crawlers/aptos';
import {
	APTOS_COIN,
	AptosAccount,
	CoinClient,
	FungibleAssetClient,
	HexString,
	TokenClient,
} from 'aptos';

export const handleTransferCoin = async (
	privateKey: Uint8Array,
	transaction: string,
) => {
	const txData = JSON.parse(transaction);

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

	return txHash;
};

export const handleUpdateDirectTransfer = async (
	privateKey: Uint8Array,
	transaction: string,
) => {
	const txData = JSON.parse(transaction as string);
	const directTransfer = txData.directTransfer as boolean;
	const pubkey = new HexString(txData.pubkey as string);
	const account = new AptosAccount(privateKey, pubkey);

	const connection = await getAptosConnection();
	const tokenClient = new TokenClient(connection.aptosClient);

	const txHash = await tokenClient.optInTokenTransfer(account, directTransfer);
	await connection.waitForTransaction(txHash);

	return txHash;
};

export const handleClaimToken = async (
	privateKey: Uint8Array,
	transaction: string,
) => {
	const txData = JSON.parse(transaction as string);
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

	return txHash;
};
