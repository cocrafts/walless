import { runtime } from '@walless/core';
import { decryptFromString, encryptToString } from '@walless/crypto';

import {
	ChannelHashmap,
	EncryptedMessage,
	EncryptionKeyVault,
	MessagePayload,
	Messenger,
	MessengerMessageListener,
	MessengerRequest,
	MessengerSend,
	MiniBroadcast,
	RequestHashmap,
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

export const createMessenger = (
	encryptionKeyVault?: EncryptionKeyVault,
): Messenger => {
	const channels: ChannelHashmap = {};
	const requests: RequestHashmap = {};

	const getChannel = (id: string): MiniBroadcast => {
		if (channels[id]) return channels[id];

		if (runtime.isExtension) {
			channels[id] = runtime.connect({ name: id });
		} else {
			channels[id] = new BroadcastChannel(id);
		}

		return channels[id];
	};

	const onMessage: MessengerMessageListener = (channelId, func) => {
		const channel = getChannel(channelId) as UniBroadcast;
		const revealEncrypted = async (
			data: EncryptedMessage,
		): Promise<UnknownObject> => {
			if (encryptionKeyVault) {
				try {
					const key = await encryptionKeyVault.get(channelId);
					return await decryptMessage(data, key);
				} catch (err) {
					console.log('Error during decrypt message:', err);
				}
			}

			return data as never;
		};

		if (runtime.isExtension) {
			const listener = async (data: EncryptedMessage) => {
				return func(await revealEncrypted(data), channel);
			};

			channel.onMessage.addListener(listener);
		} else {
			const listener = ({ data }: MessageEvent<UnknownObject>) =>
				func(data, channel);

			channel.addEventListener('message', listener);
		}
	};

	const send: MessengerSend = async (channelId, payload) => {
		const channel = getChannel(channelId);

		channel.postMessage(payload);
	};

	const request: MessengerRequest = async (channelId, payload) => {
		const channel = getChannel(channelId);

		return {};
	};

	return {
		channels,
		onMessage,
		send,
		request,
	};
};
