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
	ResponseCode,
} from '@walless/messaging';
import { signAndSendTransaction, signMessage } from '@walless/network';
import { decode, encode } from 'bs58';

import {
	getPrivateKey,
	settings,
	triggerActionToGetPrivateKey,
} from '../utils/handler';

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
	const { requestId } = payload as never;
	const popup = await handleOpenPopup(PopupType.SIGN_MESSAGE_POPUP, requestId);
	requestMap[requestId] = {
		channel,
		payload,
		popup,
		resolve: false,
	};
};

export const handleResolveSignMessage: MessengerCallback = async (
	payload,
	channel,
) => {
	const requestSource = requestMap[payload.requestId as string];

	if (!payload.isApproved) {
		requestSource.channel.postMessage({
			from: 'walless@kernel',
			requestId: requestSource.payload.requestId,
			message: Message.REJECT_REQUEST_SIGN_MESSAGE,
		});

		channel.postMessage({
			from: 'walless@kernel',
			requestId: payload.requestId,
			responseCode: ResponseCode.ERROR,
			message: 'Request rejected',
		});
	} else {
		let privateKey: Uint8Array;
		try {
			privateKey = await getPrivateKey(
				Networks.solana,
				payload.passcode as string,
			);
		} catch (error) {
			return channel.postMessage({
				from: 'walless@kernel',
				requestId: payload.requestId,
				responseCode: ResponseCode.WRONG_PASSCODE,
			});
		}

		const message = decode(requestSource.payload.message as string);
		const signature = signMessage(message, privateKey);
		requestSource.channel.postMessage({
			from: 'walless@kernel',
			requestId: requestSource.payload.requestId,
			signature: encode(signature),
		});

		channel.postMessage({
			from: 'walless@kernel',
			requestId: payload.requestId,
			responseCode: ResponseCode.SUCCESS,
		});
	}

	handleClosePopup(payload.requestId as string);
};

export const handleSignTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	const privateKey = await triggerActionToGetPrivateKey();

	if (!privateKey) {
		return;
	}

	const serializedTransaction = decode(payload.transaction as string);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);
	const keypair = Keypair.fromSecretKey(privateKey);

	transaction.sign([keypair]);

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signedTransaction: encode(transaction.serialize()),
	});

	return transaction.serialize();
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
	const message = requestMap[payload.requestId as string].payload
		.message as string;
	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		message,
	} as ResponsePayload);
};
