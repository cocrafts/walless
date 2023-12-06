import type {
	Network,
	PostMessagePairingRequest,
	PostMessagePairingResponse,
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
let recipientPublicKey: string;

window.addEventListener('message', async (e) => {
	if (
		e.data?.target !== ExtensionMessageTarget.EXTENSION ||
		(e.data?.targetId && e.data?.targetId !== WALLESS_TEZOS.id)
	) {
		return;
	}

	if (e.data?.payload === 'ping') {
		return handlePingPong();
	} else {
		let payload = e.data?.payload;
		const origin = e.origin;
		const encryptedPayload = e.data?.encryptedPayload;
		if (payload) {
			if (typeof payload === 'string') {
				payload = deserialize(payload);
			}

			if (payload.type === TEZOS_PAIRING_REQUEST) {
				return handlePairingRequest(payload, origin);
			} else {
				return handleKernelActionRequest(payload, origin);
			}
		} else if (encryptedPayload) {
			handleKernelActionRequest(encryptedPayload, origin, true);
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

const handlePairingRequest = async (
	payload: PostMessagePairingRequest,
	origin: string,
) => {
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

	respond({ payload: encryptedPayload }, origin);
};

const handleKernelActionRequest = async (
	payload: UnknownObject | string,
	origin: string,
	encrypted: boolean = false,
) => {
	if (encrypted || typeof payload === 'string') {
		payload = (await decryptPayload(payload as string)) as UnknownObject;
	}
	sendAckMessage(payload, origin);

	if (payload?.type === RequestType.REQUEST_PERMISSION_ON_TEZOS) {
		const res = await messenger.request<{ options: ConnectOptions }>('kernel', {
			from: 'walless@sdk',
			type: RequestType.REQUEST_PERMISSION_ON_TEZOS,
			options: {
				network: Networks.tezos,
				domain: payload.origin,
				onlyIfTrusted: true,
			},
		});

		const sharedKey = await createCryptoBoxClient(recipientPublicKey, keypair);
		respond(
			{
				encryptedPayload: await encryptCryptoboxPayload(
					serialize({
						id: payload.id,
						scopes: [PermissionScope.OPERATION_REQUEST, PermissionScope.SIGN],
						origin: { type: 'extension', id: chrome.runtime.id },
						type: BeaconMessageType.PermissionResponse,
						network: { type: NetworkType.MAINNET }, // TODO: handle custom networks
						publicKey: res.publicKeys[0]?.meta?.publicKey,
					}),
					sharedKey.send,
				),
			},
			origin,
		);
	} else {
		console.log('Unhandled request type');
	}
};

const sendAckMessage = async (payload: UnknownObject, origin: string) => {
	const sharedKey = await createCryptoBoxClient(recipientPublicKey, keypair);
	const resPayload = {
		type: BeaconMessageType.Acknowledge,
		id: payload?.id || '',
	};

	const encryptedPayload = await encryptCryptoboxPayload(
		serialize(resPayload),
		sharedKey.send,
	);

	respond({ encryptedPayload }, origin);
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
		console.log('error decrypting payload', e);
	}
};

const respond = (payload: UnknownObject, origin: string) => {
	window.postMessage(
		{
			message: {
				target: ExtensionMessageTarget.PAGE,
				...payload,
			},
			sender: { id: WALLESS_TEZOS.id },
		},
		origin,
	);
};
