import { getAptosConnection } from '@walless/engine/crawlers/aptos';
import {
	APTOS_COIN,
	AptosAccount,
	CoinClient,
	FungibleAssetClient,
	HexString,
	TokenClient,
} from 'aptos';

export interface AptosCoinPayload {
	from: string;
	to: string;
	amount: number;
	decimals: number;
	token: string;
}

export const handleTransferCoin = async (
	privateKey: Uint8Array,
	transaction: string,
) => {
	const txData = JSON.parse(transaction) as AptosCoinPayload;

	const fromPubkey = new HexString(txData.from);
	const toPubkey = new HexString(txData.to);
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
		const token = new HexString(txData.token);
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

export interface AptosDirectTransferPayload {
	pubkey: string;
	directTransfer: boolean;
}

export const handleUpdateDirectTransfer = async (
	privateKey: Uint8Array,
	transaction: string,
) => {
	const txData = JSON.parse(transaction) as AptosDirectTransferPayload;
	const directTransfer = txData.directTransfer;
	const pubkey = new HexString(txData.pubkey);
	const account = new AptosAccount(privateKey, pubkey);

	const connection = await getAptosConnection();
	const tokenClient = new TokenClient(connection.aptosClient);

	const txHash = await tokenClient.optInTokenTransfer(account, directTransfer);
	await connection.waitForTransaction(txHash);

	return txHash;
};

export interface AptosClaimTokenPayload {
	pubkey: string;
	sender: string;
	creator: string;
	collectionName: string;
	name: string;
}

export const handleClaimToken = async (
	privateKey: Uint8Array,
	transaction: string,
) => {
	const txData = JSON.parse(transaction) as AptosClaimTokenPayload;
	const pubkey = new HexString(txData.pubkey);
	const account = new AptosAccount(privateKey, pubkey);
	const sender = new HexString(txData.sender);
	const creator = new HexString(txData.creator);
	const collectionName = txData.collectionName;
	const name = txData.name;

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
