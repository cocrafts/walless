import {
	type Connection,
	Keypair,
	VersionedTransaction,
} from '@solana/web3.js';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import {
	type MessengerCallback,
	type ResponsePayload,
	Message,
	PopupType,
	RequestType,
	ResponseCode,
} from '@walless/messaging';
import { signAndSendTransaction, signMessage } from '@walless/network';
import { decode, encode } from 'bs58';

import { getPrivateKey, settings } from '../utils/handler';

import { handleClosePopup, handleOpenPopup, requestMap } from './shared';

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

export const handleSignMessage: MessengerCallback = async (
	payload,
	channel,
) => {
	const { requestId = '' } = payload;
	const popup = await handleOpenPopup(PopupType.SIGNATURE_POPUP, requestId);
	requestMap[requestId] = {
		channel,
		payload,
		popup,
		resolve: false,
	};
};

export const handleResolveRequestSignature: MessengerCallback = async (
	payload,
	channel,
) => {
	const requestSource = requestMap[payload.requestId as string];
	const responsePayload: ResponsePayload = {
		from: 'walless@kernel',
		requestId: payload.requestId,
	};

	const handleRejectRequest = (message: string) => {
		requestSource.channel.postMessage({
			from: 'walless@kernel',
			requestId: requestSource.payload.requestId,
			message,
		});

		channel.postMessage({
			from: 'walless@kernel',
			requestId: payload.requestId,
			responseCode: ResponseCode.ERROR,
			message: 'Request rejected',
		});
	};

	const handleResolveRequest = (payload: ResponsePayload) => {
		requestSource.channel.postMessage(payload);

		channel.postMessage({
			from: 'walless@kernel',
			requestId: payload.requestId,
			responseCode: ResponseCode.SUCCESS,
		});
	};

	const handlePrivateKey = async () => {
		try {
			return await getPrivateKey(Networks.solana, payload.passcode as string);
		} catch (error) {
			return channel.postMessage({
				from: 'walless@kernel',
				requestId: payload.requestId,
				responseCode: ResponseCode.WRONG_PASSCODE,
			});
		}
	};

	if (requestSource.payload.type === RequestType.SIGN_MESSAGE_ON_SOLANA) {
		if (!payload.isApproved) {
			handleRejectRequest(Message.REJECT_REQUEST_SIGN_MESSAGE);
		} else {
			const privateKey = await handlePrivateKey();

			if (!privateKey) {
				return;
			}

			const message = decode(requestSource.payload.message as string);
			const signature = signMessage(message, privateKey);

			handleResolveRequest({
				...responsePayload,
				signature: encode(signature),
			});
		}
	} else if (
		requestSource.payload.type === RequestType.SIGN_TRANSACTION_ON_SOLANA
	) {
		if (!payload.isApproved) {
			handleRejectRequest(Message.REJECT_REQUEST_SIGN_TRANSACTION);
		} else {
			const privateKey = await handlePrivateKey();
			if (!privateKey) {
				return;
			}
			const serializedTransaction = decode(
				requestSource.payload.transaction as string,
			);
			const transaction = VersionedTransaction.deserialize(
				serializedTransaction,
			);
			const keypair = Keypair.fromSecretKey(privateKey);

			transaction.sign([keypair]);

			requestSource.channel.postMessage({
				...responsePayload,
				signedTransaction: encode(transaction.serialize()),
			});
		}
	}

	handleClosePopup(payload.requestId as string);
};

export const handleSignTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	const { requestId = '' } = payload;
	// The next 2 lines are used to simulate transaction but will be commented for now
	// const connection: Connection = modules.engine.getConnection(Networks.solana);
	// simulateTransaction(connection, transaction);
	const popup = await handleOpenPopup(PopupType.SIGNATURE_POPUP, requestId);
	requestMap[requestId] = {
		channel,
		payload,
		popup,
		resolve: false,
	};
};

export const handleSignAndSendTransaction: MessengerCallback = async (
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
			Networks.solana,
			payload.passcode as string,
		);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}
	console.log(privateKey, 'private key');

	const serializedTransaction = decode(payload.transaction as string);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	try {
		responsePayload.signatureString = await signAndSendTransaction(
			modules.engine.getConnection(Networks.solana),
			transaction,
			payload.options || {},
			privateKey as Uint8Array,
		);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.ERROR;
		responsePayload.message = (error as Error).message;
	}

	return channel.postMessage(responsePayload);
};

export const handleRequestPayload: MessengerCallback = async (
	payload,
	channel,
) => {
	channel.postMessage({
		...requestMap[payload.requestId as string].payload,
		from: 'walless@kernel',
	} as ResponsePayload);
};
