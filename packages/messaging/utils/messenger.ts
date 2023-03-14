import { decryptFromString, encryptToString } from '@walless/crypto';

import {
	ChannelMaker,
	CombineBroadcast,
	EncryptedMessage,
	EncryptionKeyVault,
	MessagePayload,
	Messenger,
	MessengerMessageListener,
	MessengerSend,
	MiniBroadcast,
	ResponsePayload,
	UniverseChannelHashmap,
} from './types';

export const sendEncryptedMessage = async <T extends MessagePayload>(
	payload: T,
	key: CryptoKey,
	from: MiniBroadcast,
): Promise<T> => {
	if (!payload.id) payload.id = crypto.randomUUID();
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const data = JSON.stringify(payload);
	const ciphered = await encryptToString(data, key, iv);
	const ivString = Buffer.from(iv).toString('base64');
	const message: EncryptedMessage = { ciphered, iv: ivString };

	from.postMessage(message);
	return payload;
};

export const sendEncryptedRequest = async <
	T extends MessagePayload,
	R extends ResponsePayload,
>(
	payload: T,
	key: CryptoKey,
	from: MiniBroadcast,
): Promise<R> => {
	return new Promise(() => {
		console.log(payload, from, key);
	});
};

export const decryptMessage = async <T extends MessagePayload>(
	message: EncryptedMessage,
	key: CryptoKey,
): Promise<T> => {
	const iv = new Uint8Array(Buffer.from(message.iv, 'base64'));
	const decrypted = await decryptFromString(message.ciphered, key, iv);

	return JSON.parse(decrypted) as T;
};

export const createMessenger = (
	encryptionKeyVault: EncryptionKeyVault,
	channelNames: string[],
): Messenger => {
	const makeChannel: ChannelMaker = global.chrome?.runtime
		? (name) => chrome.runtime.connect({ name })
		: (name) => new BroadcastChannel(name);

	const channels = channelNames.reduce((result, name) => {
		result[name] = makeChannel(name);
		return result;
	}, {} as UniverseChannelHashmap);

	const onMessage: MessengerMessageListener = (channelId, cb) => {
		const channel = channels[channelId] as CombineBroadcast;
		const decryptAndCallback = async (data: EncryptedMessage) => {
			try {
				const key = await encryptionKeyVault.get(channel.name);
				const message = await decryptMessage(data, key);

				cb(message);
			} catch (err) {
				console.log('Error during decrypt message:', err);
			}
		};

		if (channel.onMessage) {
			(channel as chrome.runtime.Port).onMessage.addListener(
				(data: EncryptedMessage) => decryptAndCallback(data),
			);
		} else {
			(channel as BroadcastChannel).addEventListener(
				'message',
				async ({ data }: MessageEvent<EncryptedMessage>) =>
					decryptAndCallback(data),
			);
		}
	};

	const send: MessengerSend = async (channelId, payload) => {
		const key = await encryptionKeyVault.get(channelId);
		await sendEncryptedMessage(payload, key, channels[channelId]);
	};

	return {
		channels,
		onMessage,
		send,
	};
};
