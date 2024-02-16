import { TransactionBlock } from '@mysten/sui.js';
import {
	ACCOUNT_SIZE,
	createAssociatedTokenAccountInstruction,
	createTransferInstruction,
	getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	Transaction,
	VersionedMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import type { Collectible, Token, TransactionPayload } from '@walless/core';
import { logger, Networks } from '@walless/core';
import type { aptosHandler } from '@walless/network';
import { solana } from '@walless/network';
import type { TezosTransaction } from '@walless/sdk';
import type { CollectibleDocument, TokenDocument } from '@walless/store';
import { TxnBuilderTypes } from 'aptos';
import BN from 'bn.js';
import base58 from 'bs58';
import { engine } from 'engine';
import type { AptosContext, SolanaContext } from 'engine/runners';
import { capitalize } from 'lodash';
import assets from 'utils/assets';
import { environment } from 'utils/config';

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return null;
		} else if (network == Networks.sui) {
			return null;
		} else if (network == Networks.tezos) {
			return null;
		} else if (network == Networks.aptos) {
			const { AccountAddress } = TxnBuilderTypes;
			if (AccountAddress.isValid(keyStr)) {
				return null;
			} else throw new Error();
		}

		return null;
	} catch {
		return `Wrong [${capitalize(network)}] wallet address. Please check again.`;
	}
};

export const getTransactionFee = async (payload: TransactionPayload) => {
	if (payload.network == Networks.solana) {
		const transaction = await constructTransaction(payload);
		const { connection } = engine.getContext<SolanaContext>(Networks.solana);
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
		const { provider } = engine.getContext<AptosContext>(Networks.aptos);
		const fee = await provider.estimateGasPrice();
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
		const amountBN = new BN(amount * decimals);
		const { connection } = engine.getContext<SolanaContext>(network);
		if (token.metadata?.symbol == 'SOL') {
			return await solana.constructSendSOLTransaction(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amountBN.toNumber(),
			);
		} else if (token.type === 'Token') {
			return await solana.constructSendSPLTokenTransaction(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amountBN.toNumber(),
				token as Token,
			);
		} else if (token.type === 'NFT') {
			return await solana.constructSendNftTransaction(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount,
				token as Collectible,
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
	const { connection } = engine.getContext<SolanaContext>(network);
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
		new BN(amount * 10 ** decimals).toNumber(),
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

export const getBalanceFromToken = (token: TokenDocument) =>
	parseFloat(token.account.balance) / 10 ** token.account.decimals;

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
