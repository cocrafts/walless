import { TransactionBlock } from '@mysten/sui.js';
import {
	ACCOUNT_SIZE,
	createAssociatedTokenAccountInstruction,
	createTransferInstruction,
	getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import type { Connection } from '@solana/web3.js';
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
	TransactionMessage,
	VersionedMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import type {
	Collectible,
	TezosTransaction,
	Token,
	TransactionPayload,
} from '@walless/core';
import { logger, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { aptosHandler } from '@walless/kernel';
import type { CollectibleDocument, TokenDocument } from '@walless/store';
import type { Provider } from 'aptos';
import { TxnBuilderTypes } from 'aptos';
import base58 from 'bs58';
import assets from 'utils/assets';
import { environment } from 'utils/config';

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return { valid: true, message: '' };
		} else if (network == Networks.sui) {
			return { valid: true, message: '' };
		} else if (network == Networks.tezos) {
			return { valid: true, message: '' };
		} else if (network == Networks.aptos) {
			const { AccountAddress } = TxnBuilderTypes;
			return { valid: AccountAddress.isValid(keyStr), message: '' };
		}
		return { valid: false, message: 'Unsupported network ' + network };
	} catch (error) {
		return { valid: false, message: (error as Error).message };
	}
};

export const getTransactionFee = async (payload: TransactionPayload) => {
	if (payload.network == Networks.solana) {
		const transaction = await constructTransaction(payload);
		const connection = modules.engine.getConnection(
			Networks.solana,
		) as Connection;
		const message = (transaction as VersionedTransaction).message;
		const transactionFeePromise = connection
			.getFeeForMessage(message)
			.then((res) => res.value || 0);

		const rentFeePromise = (async () => {
			if (payload.token.metadata?.symbol == 'SOL') return 0;
			const receiverATAddress = getAssociatedTokenAddressSync(
				new PublicKey(payload.token.account.mint as string),
				new PublicKey(payload.receiver),
			);

			const receiverATAccount =
				await connection.getAccountInfo(receiverATAddress);

			if (!receiverATAccount) {
				return await connection.getMinimumBalanceForRentExemption(ACCOUNT_SIZE);
			}

			return 0;
		})();

		const [txFee, rentFee] = await Promise.all([
			transactionFeePromise,
			rentFeePromise,
		]);

		return (txFee + rentFee || 0) / LAMPORTS_PER_SOL;
	} else if (payload.network == Networks.sui) {
		return 0;
	} else if (payload.network == Networks.aptos) {
		const connection = modules.engine.getConnection<Provider>(Networks.aptos);
		const fee = await connection.estimateGasPrice();
		return fee.gas_estimate / 10 ** 8;
	} else return 0;
};

type SendTokenProps = {
	sender: string;
	token: TokenDocument | CollectibleDocument;
	network: Networks;
	receiver: string;
	amount: number;
	tokenForFee: Token;
};

export const constructTransaction = async ({
	sender,
	token,
	network,
	receiver,
	amount,
}: SendTokenProps) => {
	const decimals = (token as TokenDocument).account?.decimals
		? 10 ** ((token as TokenDocument).account.decimals || 0)
		: 1;
	const isCollectible = token.type === 'NFT';

	if (network == Networks.solana) {
		const connection = modules.engine.getConnection(network) as Connection;
		if (token.metadata?.symbol == 'SOL') {
			return await constructSendSOLTransaction(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
			);
		} else if (token.network == Networks.solana) {
			return await constructSendSPLTokenTransactionInSol(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
				token as Token,
			);
		}
	} else if (network == Networks.sui) {
		if (token.metadata?.symbol == 'SUI') {
			return await constructSendSUITransaction(receiver, amount * decimals);
		}
	} else if (network == Networks.tezos) {
		if (token.metadata?.symbol == 'TEZ') {
			return constructSendTezTransaction(receiver, amount);
		}
	} else if (network == Networks.aptos) {
		if (isCollectible) {
			const nft = token as CollectibleDocument;

			return {
				from: sender,
				to: receiver,
				creator: nft.metadata.aptosToken?.creatorAddress || '',
				collectionName: nft.metadata.aptosToken?.collectionName || '',
				tokenName: nft.metadata.name || '',
				wallessCollectionId: nft.collectionId || '',
				wallessCollectibleId: nft._id || '',
				amount: amount,
			} satisfies aptosHandler.AptosTokenPayload;
		} else {
			const coin = token as TokenDocument;
			return {
				from: sender,
				to: receiver,
				token: coin.account.address || '',
				amount: amount,
				decimals: coin.account?.decimals,
			} satisfies aptosHandler.AptosCoinPayload;
		}
	}

	throw Error('Network or Token is not supported');
};

const constructSendSOLTransaction = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
) => {
	const instructions = [
		SystemProgram.transfer({
			fromPubkey: sender,
			toPubkey: receiver,
			lamports: amount,
		}),
	];

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

const constructSendSPLTokenTransactionInSol = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	token: Token | Collectible,
) => {
	const mintAddress = new PublicKey(token.account.mint as string);
	const senderATAddress = getAssociatedTokenAddressSync(mintAddress, sender);
	const ReceiverATAddress = getAssociatedTokenAddressSync(
		mintAddress,
		receiver,
	);
	const receiverATA = await connection.getAccountInfo(ReceiverATAddress);

	const instructions = [];
	if (!receiverATA) {
		const createATAInstruction = createAssociatedTokenAccountInstruction(
			sender,
			ReceiverATAddress,
			receiver,
			mintAddress,
		);
		instructions.push(createATAInstruction);
	}

	const transferInstruction = createTransferInstruction(
		senderATAddress,
		ReceiverATAddress,
		sender,
		amount,
	);
	instructions.push(transferInstruction);

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions: instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

const constructSendSUITransaction = async (
	receiver: string,
	amount: number,
) => {
	const tx = new TransactionBlock();

	const [coin] = tx.splitCoins({ kind: 'GasCoin' }, [tx.pure(amount)]);

	tx.transferObjects([coin], tx.pure(receiver));
	return tx;
};

const constructSendTezTransaction = (
	receiver: string,
	amount: number,
): TezosTransaction => {
	return {
		type: 'native',
		receiver,
		amount,
	};
};

const constructTransactionAbstractFeeTemplate = async (
	{ network, sender, token, tokenForFee, receiver, amount }: SendTokenProps,
	fee?: number,
) => {
	const connection = modules.engine.getConnection(network) as Connection;
	const bh = await connection.getLatestBlockhash('finalized');

	const blockhash = bh.blockhash;

	const lastValidBlockHeight = bh.lastValidBlockHeight;
	const transaction = new Transaction({
		blockhash,
		lastValidBlockHeight,
	});

	const mintAddress = new PublicKey(token.account.mint as string);
	const tokenForFeeMintAddress = new PublicKey(
		tokenForFee.account.mint as string,
	);
	const decimals = (token as Token).account?.decimals ?? 0;

	const senderPublicKey = new PublicKey(sender);
	const senderAta = getAssociatedTokenAddressSync(mintAddress, senderPublicKey);

	const senderTokenForFeeAta = getAssociatedTokenAddressSync(
		tokenForFeeMintAddress,
		senderPublicKey,
	);

	const receiverPublicKey = new PublicKey(receiver);
	const receiverAta = getAssociatedTokenAddressSync(
		mintAddress,
		receiverPublicKey,
	);

	const octaneConfig = await fetch(`${environment.GASILON_ENDPOINT}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());

	const feePayerPublicKey = new PublicKey(octaneConfig.feePayer);
	const feePayerAta = getAssociatedTokenAddressSync(
		tokenForFeeMintAddress,
		feePayerPublicKey,
	);

	const instructions = [];

	fee = fee ? parseFloat(fee?.toPrecision(7)) : 1;

	const feePaymentInstruction = createTransferInstruction(
		senderTokenForFeeAta,
		feePayerAta,
		senderPublicKey,
		fee * 10 ** tokenForFee.account.decimals,
	);

	const receiverAtaInfo = await connection.getAccountInfo(receiverAta);

	const receiverTokenAtaCreationInstruction =
		createAssociatedTokenAccountInstruction(
			feePayerPublicKey,
			receiverAta,
			receiverPublicKey,
			mintAddress,
		);

	const transferInstruction = createTransferInstruction(
		senderAta,
		receiverAta,
		senderPublicKey,
		amount * 10 ** decimals,
	);

	instructions.push(feePaymentInstruction);

	if (!receiverAtaInfo) {
		instructions.push(receiverTokenAtaCreationInstruction);
	}
	instructions.push(transferInstruction);

	transaction.feePayer = feePayerPublicKey;
	transaction.add(...instructions);

	const finalTransaction = new VersionedTransaction(
		VersionedMessage.deserialize(transaction.serializeMessage()),
	);

	return finalTransaction;
};

export const constructTransactionAbstractFee = async (
	sendTokenProps: SendTokenProps,
) => {
	const fee = await getTransactionAbstractFee(sendTokenProps);

	const transaction = await constructTransactionAbstractFeeTemplate(
		sendTokenProps,
		fee,
	);

	return transaction;
};

export const getTransactionAbstractFee = async (
	sendTokenProps: SendTokenProps,
) => {
	const transaction =
		await constructTransactionAbstractFeeTemplate(sendTokenProps);

	const transactionString = base58.encode(transaction.serialize());

	const data = await (
		await fetch(`${environment.GASILON_ENDPOINT}/solana/getFee`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				transaction: transactionString,
			}),
		})
	)
		.json()
		.then((data) => {
			return data;
		})
		.catch((err) => {
			logger.error('Failed to get Gasilon fee:', err);
		});

	const { tokenForFee } = sendTokenProps;

	return parseFloat(
		data.totalByFeeToken.toFixed(tokenForFee.account.decimals ?? 7),
	);
};

export const getTokenString = (token: TokenDocument) => {
	return `${
		parseFloat(token?.account.balance ?? '0') /
		10 ** (token?.account.decimals ?? 0)
	} ${token?.metadata?.symbol ?? ''}`;
};

export const prepareTransactionPayload = (
	element: TokenDocument | CollectibleDocument,
	sender: string,
	receiver: string,
	amount: string,
	tokenForFee: Token,
) => {
	const type = element.type;
	const payload: TransactionPayload = {
		sender,
		receiver,
		tokenForFee,
		network: element?.network as Networks,
	} as unknown as TransactionPayload;

	switch (type) {
		case 'Token': {
			payload.amount = parseFloat(amount);
			payload.token = element;
			payload.network = element.network as Networks;
			break;
		}
		case 'NFT': {
			payload.amount = 1;
			payload.token = element as CollectibleDocument;
			break;
		}
	}

	return payload;
};

export const getNetworkMetadata = (network: Networks) => {
	let networkIcon;
	let networkName = '';
	let nativeSymbol = '';
	if (network == Networks.solana) {
		networkIcon = assets.widget.solana.storeMeta.iconUri;
		networkName = 'Solana';
		nativeSymbol = 'SOL';
	} else if (network == Networks.sui) {
		networkIcon = assets.widget.sui.storeMeta.iconUri;
		networkName = 'SUI';
		nativeSymbol = 'SUI';
	} else if (network == Networks.tezos) {
		networkIcon = assets.widget.tezos.storeMeta.iconUri;
		networkName = 'Tezos';
		nativeSymbol = 'TEZ';
	} else if (network === Networks.aptos) {
		networkIcon = assets.widget.aptos.storeMeta.iconUri;
		networkName = 'Aptos';
		nativeSymbol = 'APT';
	}

	return { networkIcon, networkName, nativeSymbol };
};
