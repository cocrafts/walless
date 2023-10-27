import type { Connection } from '@solana/web3.js';
import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { MessengerCallback, ResponsePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';
import base58, { decode, encode } from 'bs58';
import { sign } from 'tweetnacl';

import type { HandleMethod } from '../utils/types';

export const getEndpoint: MessengerCallback = async (payload, channel) => {
	const conn = modules.engine.getConnection(Networks.solana) as Connection;
	const endpoint = conn.rpcEndpoint;

	const responsePayload: ResponsePayload = {
		from: 'walless@kernel',
		requestId: payload.requestId,
		responseCode: ResponseCode.SUCCESS,
		endpoint,
	};

	channel.postMessage(responsePayload);
};

export const signMessage: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	const message = decode(payload.message as string);
	const keypair = Keypair.fromSecretKey(privateKey);
	const signatureBytes = sign.detached(message, keypair.secretKey);

	responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
		signature: encode(signatureBytes),
	});
};

export const signTransaction: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	const keypair = Keypair.fromSecretKey(privateKey);
	const serializedTransaction = decode(payload.transaction as string);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	transaction.sign([keypair]);

	responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
		signedTransaction: encode(transaction.serialize()),
	});
};

export const signAndSendTransaction: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	const connection = modules.engine.getConnection(
		Networks.solana,
	) as Connection;

	const keypair = Keypair.fromSecretKey(privateKey);

	const serializedTransaction = decode(payload.transaction as string);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	transaction.message.recentBlockhash = (
		await connection.getLatestBlockhash({ commitment: 'finalized' })
	).blockhash;

	transaction.sign([keypair]);

	const signatureString = await connection.sendTransaction(transaction);

	responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
		signatureString,
	});
};

export const signTransactionAbstractionFee: HandleMethod = async ({
	privateKey,
	payload,
	responseMethod,
}) => {
	const keypair = Keypair.fromSecretKey(privateKey);

	const serializedTransaction = decode(payload.transaction as string);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	transaction.sign([keypair]);

	const txStr = base58.encode(transaction.serialize());

	fetch(`${GASILON_ENDPOINT}/solana/transfer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			transaction: txStr,
		}),
	})
		.then((res) => {
			res.json().then((data) => {
				responseMethod(payload.requestId as string, ResponseCode.SUCCESS, {
					signatureString: data.signature,
				});
			});
		})
		.catch(() => {
			responseMethod(payload.requestId as string, ResponseCode.ERROR, {
				message: 'Error in signing transaction',
			});
		});
};
