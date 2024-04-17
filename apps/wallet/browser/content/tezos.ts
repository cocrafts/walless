import type {
	OperationRequest,
	PermissionRequest,
	PostMessagePairingRequest,
	PostMessagePairingResponse,
	SignPayloadRequest,
	SignPayloadResponse,
} from '@airgap/beacon-sdk';
import {
	BeaconMessageType,
	decryptCryptoboxPayload,
	encryptCryptoboxPayload,
	ExtensionMessageTarget,
	NetworkType,
	PermissionScope,
	sealCryptobox,
} from '@airgap/beacon-sdk';
import type { UnknownObject } from '@walless/core';
import { logger, Networks, RequestType } from '@walless/core';
import {
	createCryptoBoxClient,
	createCryptoBoxServer,
} from '@walless/crypto/utils/p2p';
import type { ConnectOptions } from '@walless/sdk';

import {
	deserialize,
	getDAppPublicKey,
	getOrCreateKeypair,
	messenger,
	serialize,
	storeDAppPublicKey,
} from './utils';

const TEZOS_PAIRING_REQUEST = 'postmessage-pairing-request';
const TEZOS_PAIRING_RESPONSE = 'postmessage-pairing-response';

const ONE_MINUTE_TO_MS = 60000;

export const WALLESS_TEZOS = {
	id: chrome?.runtime?.id || 'sdfsdgfsd',
	name: 'Walless',
	iconUrl: 'https://walless.io/img/walless-icon.svg',
	appUrl: 'https://walless.io',
	version: '3',
};

let targetWindow = window;
export const resolveTargetWindow = (w: Window) => {
	if (w) {
		console.log('use external window');
		targetWindow = w as never;
	}
	targetWindow.postMessage('hello from Walless - Tezos wallet 2', '*');
};

export let init = false;
export const initializeTezosWallet = () => {
	console.log('init tezos wallet');
	if (init) {
		logger.error('already initialized tezos wallet');
		return;
	}

	init = true;

	window.addEventListener('message', async (e) => {
		if (e.data?.type && e.data.type.includes('webpack')) {
			return;
		}

		console.log('tezos wallet - on message:', e.data, e.origin);
		if (!e.data) return;
		const { target, targetId } = e.data;
		const isNotTezosRequest = target !== ExtensionMessageTarget.EXTENSION;
		const wrongTarget = targetId && targetId !== WALLESS_TEZOS.id;
		if (isNotTezosRequest || wrongTarget) return;

		if (e.data.payload === 'ping') return handlePingPong();

		origin = e.origin;
		if (e.data.payload) {
			let payload = e.data.payload;
			if (typeof payload === 'string') payload = deserialize(payload);

			if (payload.type === TEZOS_PAIRING_REQUEST) {
				return handlePairingRequest(payload);
			} else if (payload.type === BeaconMessageType.PermissionRequest) {
				const response = await handlePermissionRequest(payload as never);
				targetWindow.postMessage({
					message: {
						target: ExtensionMessageTarget.PAGE,
						payload: response,
					},
					sender: { id: WALLESS_TEZOS.id },
				});
			}
		} else if (e.data.encryptedPayload) {
			handleEncryptedRequest(e.data.encryptedPayload);
		}
	});
};

const handlePingPong = () => {
	console.log('handle ping pong');
	targetWindow.postMessage({
		target: ExtensionMessageTarget.PAGE,
		payload: 'pong',
		sender: WALLESS_TEZOS,
	});
};

const handlePairingRequest = async (payload: PostMessagePairingRequest) => {
	const keypair = await getOrCreateKeypair(origin, true);
	const recipientPublicKey = await storeDAppPublicKey(
		origin,
		payload.publicKey,
	);

	const resPayload: PostMessagePairingResponse = {
		type: TEZOS_PAIRING_RESPONSE,
		publicKey: Buffer.from(keypair.publicKey).toString('hex'),
		...WALLESS_TEZOS,
	};

	const recipientPublicKeyBytes = Uint8Array.from(
		Buffer.from(recipientPublicKey, 'hex'),
	);

	const encryptedPayload = await sealCryptobox(
		JSON.stringify(resPayload),
		recipientPublicKeyBytes,
	);

	targetWindow.postMessage({
		message: {
			target: ExtensionMessageTarget.PAGE,
			payload: encryptedPayload,
		},
		sender: { id: WALLESS_TEZOS.id },
	});
};

const handleEncryptedRequest = async (encryptedPayload: string) => {
	if (typeof encryptedPayload !== 'string') return;
	const payload = await decryptPayload(encryptedPayload);
	if (!payload || !payload.type) return;
	sendAckMessage(payload.id);

	let response;
	if (payload.type === BeaconMessageType.PermissionRequest) {
		response = await handlePermissionRequest(payload as never);
	} else if (payload.type === BeaconMessageType.Disconnect) {
		handleDisconnect();
	} else if (payload.type === BeaconMessageType.SignPayloadRequest) {
		response = await handleSignPayloadRequest(payload as never);
	} else if (payload.type === BeaconMessageType.OperationRequest) {
		response = await handleOperationRequest(payload as never);
	} else {
		console.log('not support this type of request');
	}

	if (response) {
		respondWithSharedKeyEncrypt(response);
	}
};

const handlePermissionRequest = async (payload: PermissionRequest) => {
	// TODO: check network is valid or not, throw error if not
	const res = await messenger.request<{ options: ConnectOptions }>(
		'kernel',
		{
			from: 'walless@sdk',
			type: RequestType.REQUEST_CONNECT,
			options: {
				network: Networks.tezos,
				domain: origin,
				onlyIfTrusted: true,
			},
		},
		ONE_MINUTE_TO_MS,
	);

	const response = {
		id: payload.id,
		type: BeaconMessageType.PermissionResponse,
		network: { type: NetworkType.MAINNET }, // TODO: handle custom networks
		publicKey: res.publicKeys[0].publicKey,
		scopes: [PermissionScope.OPERATION_REQUEST, PermissionScope.SIGN],
	};

	return response;
};

const handleSignPayloadRequest = async (payload: SignPayloadRequest) => {
	const res = await messenger.request(
		'kernel',
		{
			from: 'walless@sdk',
			type: RequestType.SIGN_PAYLOAD_ON_TEZOS,
			payload: payload.payload,
			signingType: payload.signingType,
		},
		ONE_MINUTE_TO_MS,
	);

	const response: SignPayloadResponse = {
		id: payload.id,
		signature: res.signature,
		signingType: payload.signingType,
		type: BeaconMessageType.SignPayloadResponse,
		senderId: payload.senderId,
		version: '2',
	};

	return response;
};

const handleOperationRequest = async (payload: OperationRequest) => {
	// TODO: need to implement
	console.log(payload);
};

const sendAckMessage = async (requestId: string) => {
	const response = {
		type: BeaconMessageType.Acknowledge,
		id: requestId,
	};

	return response;
};

const decryptPayload = async (encryptedPayload: string) => {
	const keypair = await getOrCreateKeypair(origin);
	const recipientPublicKey = await getDAppPublicKey(origin);
	const sharedKey = await createCryptoBoxServer(recipientPublicKey, keypair);
	try {
		const payload = await decryptCryptoboxPayload(
			Buffer.from(encryptedPayload, 'hex'),
			sharedKey.receive,
		);

		const payloadJson = deserialize(payload);
		return payloadJson;
	} catch (e) {
		// TODO: need to respond error to client side
		console.log('error decrypting payload', e);
		handleDisconnect();
	}
};

const respondWithSharedKeyEncrypt = async (payload: UnknownObject) => {
	const keypair = await getOrCreateKeypair(origin);
	const recipientPublicKey = await getDAppPublicKey(origin);
	const sharedKey = await createCryptoBoxClient(recipientPublicKey, keypair);
	const encryptedPayload = await encryptCryptoboxPayload(
		serialize(payload),
		sharedKey.send,
	);

	targetWindow.postMessage({
		message: {
			target: ExtensionMessageTarget.PAGE,
			encryptedPayload,
		},
		sender: { id: WALLESS_TEZOS.id },
	});
};

const handleDisconnect = () => {
	messenger.request<{ options: ConnectOptions }>('kernel', {
		from: 'walless@sdk',
		type: RequestType.REQUEST_DISCONNECT,
		options: {
			domain: origin,
		},
	});
};
