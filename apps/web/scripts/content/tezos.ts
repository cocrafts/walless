import type {
	PermissionRequest,
	PostMessagePairingRequest,
	PostMessagePairingResponse,
	SignPayloadRequest,
	SignPayloadResponse,
} from '@airgap/beacon-sdk';
import {
	BeaconMessageType,
	NetworkType,
	PermissionScope,
} from '@airgap/beacon-sdk';
import { ExtensionMessageTarget } from '@airgap/beacon-sdk';
import {
	decryptCryptoboxPayload,
	encryptCryptoboxPayload,
	sealCryptobox,
} from '@airgap/beacon-utils';
import type { ConnectOptions } from '@walless/core';
import { Networks, type UnknownObject } from '@walless/core';
import {
	createCryptoBoxClient,
	createCryptoBoxServer,
	generateKeyPair,
} from '@walless/crypto/utils/p2p';
import { RequestType } from '@walless/messaging';

import { messenger } from './messaging';
import { deserialize, serialize } from './utils';

const TEZOS_PAIRING_REQUEST = 'postmessage-pairing-request';
const TEZOS_PAIRING_RESPONSE = 'postmessage-pairing-response';

const WALLESS_TEZOS = {
	id: chrome.runtime.id,
	name: 'Walless',
	iconUrl: 'https://walless.io/img/walless-icon.svg',
	appUrl: 'https://walless.io',
	version: '3',
};

const keypair = generateKeyPair();
let recipientPublicKey: string; // TODO: need to store the public key of dApp
let origin: string;

window.addEventListener('message', async (e) => {
	console.log('On message', e.data, e.origin);
	const isNotTezosRequest = e.data?.target !== ExtensionMessageTarget.EXTENSION;
	const wrongTarget = e.data?.targetId && e.data?.targetId !== WALLESS_TEZOS.id;
	if (isNotTezosRequest || wrongTarget) {
		return;
	}

	if (e.data?.payload === 'ping') {
		return handlePingPong();
	} else {
		origin = e.origin;
		let payload = e.data?.payload;
		const encryptedPayload = e.data?.encryptedPayload;
		if (payload) {
			if (typeof payload === 'string') payload = deserialize(payload);
			if (payload.type === TEZOS_PAIRING_REQUEST) {
				return handlePairingRequest(payload);
			}
		} else if (encryptedPayload) {
			handleEncryptedRequest(encryptedPayload);
		}
	}
});

const handlePingPong = () => {
	window.postMessage({
		target: ExtensionMessageTarget.PAGE,
		payload: 'pong',
		sender: WALLESS_TEZOS,
	});
};

const handlePairingRequest = async (payload: PostMessagePairingRequest) => {
	const resPayload: PostMessagePairingResponse = {
		type: TEZOS_PAIRING_RESPONSE,
		publicKey: Buffer.from(keypair.publicKey).toString('hex'),
		...WALLESS_TEZOS,
	};

	recipientPublicKey = payload.publicKey;
	const recipientPublicKeyBytes = Uint8Array.from(
		Buffer.from(recipientPublicKey, 'hex'),
	);

	const encryptedPayload = await sealCryptobox(
		JSON.stringify(resPayload),
		recipientPublicKeyBytes,
	);

	window.postMessage({
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
	console.log(payload, '<-- payload after decrypt');
	if (!payload || !payload.type) return;
	sendAckMessage(payload.id);

	if (payload.type === BeaconMessageType.PermissionRequest) {
		console.log('handle permission request');
		handlePermissionRequest(payload as never);
	} else if (payload.type === BeaconMessageType.Disconnect) {
		console.log('handle disconnect');
		handleDisconnect();
	} else if (payload.type === BeaconMessageType.SignPayloadRequest) {
		console.log('handle sign payload');
		handleSignPayloadRequest(payload as never);
	} else if (payload.type === BeaconMessageType.OperationRequest) {
		console.log('handle operation request');
	} else {
		console.log('not support this type of request');
	}
};

const handlePermissionRequest = async (payload: PermissionRequest) => {
	// TODO: check network is valid or net, throw error if not
	const res = await messenger.request<{ options: ConnectOptions }>('kernel', {
		from: 'walless@sdk',
		type: RequestType.REQUEST_CONNECT,
		options: {
			network: Networks.tezos,
			domain: origin,
			onlyIfTrusted: true,
		},
	});

	const resPayload = {
		id: payload.id,
		type: BeaconMessageType.PermissionResponse,
		network: { type: NetworkType.MAINNET }, // TODO: handle custom networks
		publicKey: res.publicKeys[0]?.meta?.publicKey,
		scopes: [PermissionScope.OPERATION_REQUEST, PermissionScope.SIGN],
	};

	respondWithSharedKeyEncrypt(resPayload);
};

const handleSignPayloadRequest = async (payload: SignPayloadRequest) => {
	const res = await messenger.request('kernel', {
		from: 'walless@sdk',
		type: RequestType.SIGN_PAYLOAD_ON_TEZOS,
		payload: payload.payload,
		signingType: payload.signingType,
	});

	const resPayload: SignPayloadResponse = {
		id: payload.id,
		signature: res.signature,
		signingType: payload.signingType,
		type: BeaconMessageType.SignPayloadResponse,
		senderId: payload.senderId,
		version: '2',
	};

	respondWithSharedKeyEncrypt(resPayload);
};

const sendAckMessage = async (requestId: string) => {
	const resPayload = {
		type: BeaconMessageType.Acknowledge,
		id: requestId,
	};

	respondWithSharedKeyEncrypt(resPayload);
};

const decryptPayload = async (encryptedPayload: string) => {
	const sharedKey = await createCryptoBoxServer(recipientPublicKey, keypair);
	try {
		const payload = await decryptCryptoboxPayload(
			Buffer.from(encryptedPayload, 'hex'),
			sharedKey.receive,
		);

		return deserialize(payload);
	} catch (e) {
		// TODO: need to respond error to client side
		console.log('error decrypting payload', e);
		handleDisconnect();
	}
};

const respondWithSharedKeyEncrypt = async (payload: UnknownObject) => {
	const sharedKey = await createCryptoBoxClient(recipientPublicKey, keypair);
	const encryptedPayload = await encryptCryptoboxPayload(
		serialize(payload),
		sharedKey.send,
	);
	window.postMessage({
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
