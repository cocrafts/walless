import { runtime } from '@walless/core';
import { decryptFromString, encryptToString } from '@walless/crypto';

import {
	ChannelHashmap,
	EncryptedMessage,
	EncryptionKeyVault,
	MessagePayload,
	Messenger,
	MessengerMessageListener,
	MessengerSend,
	MiniBroadcast,
	ResponsePayload,
	UniBroadcast,
	UnknownObject,
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

const getLazyChannel = (id: string, cache: ChannelHashmap): MiniBroadcast => {
	if (cache[id]) return cache[id];

	if (runtime.isExtension) {
		cache[id] = runtime.connect({ name: id });
	} else {
		cache[id] = new BroadcastChannel(id);
	}

	return cache[id];
};

export const createEncryptedMessenger = (
	encryptionKeyVault: EncryptionKeyVault,
): Messenger => {
	const channels: ChannelHashmap = {};

	const onMessage: MessengerMessageListener = (channelId, func) => {
		const channel = getLazyChannel(channelId, channels) as UniBroadcast;

		const decryptAndCallback = async (data: EncryptedMessage) => {
			try {
				const key = await encryptionKeyVault.get(channel.name);
				const payload = await decryptMessage(data, key);

				func(payload, channel);
			} catch (err) {
				console.log('Error during decrypt message:', err);
			}
		};

		if (runtime.isExtension) {
			const listener = (payload: EncryptedMessage) => {
				return decryptAndCallback(payload);
			};

			channel.onMessage.addListener(listener);
		} else {
			const listener = ({ data }: MessageEvent<EncryptedMessage>) => {
				return decryptAndCallback(data);
			};

			channel.addEventListener('message', listener);
		}
	};

	const send: MessengerSend = async (channelId, payload) => {
		const channel = getLazyChannel(channelId, channels);
		const key = await encryptionKeyVault.get(channelId);

		await sendEncryptedMessage(payload, key, channel);
	};

	return {
		channels,
		onMessage,
		send,
	};
};

export const createMessenger = (): Messenger => {
	const channels: ChannelHashmap = {};

	const onMessage: MessengerMessageListener = (channelId, func) => {
		const channel = getLazyChannel(channelId, channels) as UniBroadcast;

		if (runtime.isExtension) {
			const listener = (data: UnknownObject) => func(data, channel);

			channel.onMessage.addListener(listener);
		} else {
			const listener = ({ data }: MessageEvent<UnknownObject>) =>
				func(data, channel);

			channel.addEventListener('message', listener);
		}
	};

	const send: MessengerSend = async (channelId, payload) => {
		const channel = getLazyChannel(channelId, channels);

		channel.postMessage(payload);
	};

	return {
		channels,
		onMessage,
		send,
	};
};
