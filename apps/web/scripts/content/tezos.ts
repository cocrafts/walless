import type {
	PostMessagePairingRequest,
	PostMessagePairingResponse,
} from '@airgap/beacon-sdk';
import { ExtensionMessageTarget } from '@airgap/beacon-sdk';
import { sealCryptobox } from '@airgap/beacon-utils';

import { messenger } from './messaging';

const TEZOS_PAIRING_REQUEST = 'postmessage-pairing-request';
const TEZOS_PAIRING_RESPONSE = 'postmessage-pairing-response';

import { generateKeyPair } from '@walless/crypto/utils/p2p';

import { deserialize } from './utils';

const WALLESS_TEZOS = {
	id: chrome.runtime.id,
	name: 'Walless',
	iconUrl: 'https://walless.io/img/walless-icon.svg',
	appUrl: 'https://walless.io',
	version: '1.0.0',
};

const keypair = generateKeyPair();

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
		if (typeof payload === 'string') {
			payload = deserialize(payload);
		}

		if (payload.type === TEZOS_PAIRING_REQUEST) {
			return handlePairingRequest(payload as PostMessagePairingRequest);
		} else {
			const res = await messenger.request('kernel', {
				from: 'walless@sdk',
				payload,
			});

			window.postMessage(res);
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

	const recipientPublicKey = payload.publicKey;

	window.postMessage({
		message: {
			target: ExtensionMessageTarget.PAGE,
			payload: await sealCryptobox(
				JSON.stringify(resPayload),
				Uint8Array.from(Buffer.from(recipientPublicKey, 'hex')),
			),
		},
		sender: { id: WALLESS_TEZOS.id },
	});
};
