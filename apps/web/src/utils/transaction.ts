import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import { constructTransaction } from '@walless/app/utils';
import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import axios from 'axios';
import { requestHandleTransaction } from 'bridge/listeners';
import base58, { encode } from 'bs58';

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const transaction =
		payload.tokenForFee.metadata?.symbol === 'SOL'
			? await constructTransaction(payload)
			: await constructTransactionAbstractFee(payload);

	let res;

	if (transaction instanceof VersionedTransaction) {
		res =
			payload.tokenForFee.metadata?.symbol === 'SOL'
				? await requestHandleTransaction({
						type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
				  })
				: await requestHandleTransaction({
						type: RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA,
						transaction: encode(transaction.serialize()),
						passcode,
				  });
	} else if (transaction instanceof TransactionBlock) {
		res = await requestHandleTransaction({
			type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
			transaction: transaction.serialize(),
			passcode,
		});
	} else if (payload.network == Networks.tezos) {
		res = await requestHandleTransaction({
			type: RequestType.TRANSFER_TEZOS_TOKEN,
			transaction: JSON.stringify(transaction),
			passcode,
		});
	}

	return res as ResponsePayload;
};

// TODO: need to revise and move to package
const constructTransactionAbstractFeeTemplate = async (
	{ sender, token, tokenForFee, receiver, amount }: SendTokenProps,
	fee?: number,
) => {
	const connection = await getSolanaConnection();
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

	const octaneConfig = (
		await axios.get(GASILON_ENDPOINT, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		})
	).data;

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
		await fetch(`${GASILON_ENDPOINT}/solana/getFee`, {
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
			console.log(err);
		});

	const { tokenForFee } = sendTokenProps;

	return parseFloat(
		data.totalByFeeToken.toFixed(tokenForFee.account.decimals ?? 7),
	);
};
