import { decryptFromString, encryptToString } from '@walless/crypto';

import {
	ChannelHashmap,
	EncryptedMessage,
	EncryptionKeyVault,
	MessagePayload,
	Messenger,
	MessengerMessageListener,
	MessengerSend,
	ResponsePayload,
	UnknownObject,
} from './types';

export const sendEncryptedMessage = async <T extends MessagePayload>(
	payload: T,
	key: CryptoKey,
	from: BroadcastChannel,
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
	from: BroadcastChannel,
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

export const createEncryptedMessenger = (
	channelNames: string[],
	encryptionKeyVault: EncryptionKeyVault,
): Messenger => {
	const channels = channelNames.reduce((result, name) => {
		result[name] = new BroadcastChannel(name);
		return result;
	}, {} as ChannelHashmap);

	const onMessage: MessengerMessageListener = (channelId, cb) => {
		const channel = channels[channelId];
		if (!channel) return;

		const decryptAndCallback = async (data: EncryptedMessage) => {
			try {
				const key = await encryptionKeyVault.get(channel.name);
				const message = await decryptMessage(data, key);

				cb(message);
			} catch (err) {
				console.log('Error during decrypt message:', err);
			}
		};

		channel.onmessage = async ({ data }: MessageEvent<EncryptedMessage>) => {
			await decryptAndCallback(data);
		};
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

export const createMessenger = (channelNames: string[]): Messenger => {
	const channels = channelNames.reduce((result, name) => {
		result[name] = new BroadcastChannel(name);
		console.log(name, 'channel initialized!');

		return result;
	}, {} as ChannelHashmap);

	const onMessage: MessengerMessageListener = (channelId, cb) => {
		const channel = channels[channelId];
		if (!channel) return;

		channels[channelId].onmessage = ({ data }: MessageEvent<UnknownObject>) => {
			cb(data);
		};
	};

	const send: MessengerSend = async (channelId, payload) => {
		console.log('sending', channels[channelId], payload);
		channels[channelId]?.postMessage(payload);
	};

	return {
		channels,
		onMessage,
		send,
	};
};
