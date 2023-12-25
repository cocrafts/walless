import type {
	ChannelHashmap,
	MiniBroadcast,
	RequestHashmap,
	UniBroadcast,
} from '@walless/core';
import { logger, runtime } from '@walless/core';
import { decryptFromString, encryptToString } from '@walless/crypto';

import type {
	EncryptedMessage,
	EncryptionKeyVault,
	MessagePayload,
	Messenger,
	MessengerMessageListener,
	MessengerRequest,
	MessengerSend,
} from './types';

export const createMessenger = (
	encryptionKeyVault?: EncryptionKeyVault,
): Messenger => {
	const channelHashmap: ChannelHashmap = {};
	const requestHashmap: RequestHashmap = {};

	setInterval(() => {
		for (const id in requestHashmap) {
			const request = requestHashmap[id];
			const milliseconds = new Date().getTime() - request.timestamp.getTime();

			if (milliseconds >= request.timeout) {
				request.reject(new Error('request timeout'));
				delete requestHashmap[id];
			}
		}
	}, 500);

	const smartReveal = async (
		data: EncryptedMessage,
		channelId: string,
	): Promise<MessagePayload> => {
		if (data?.iv && encryptionKeyVault) {
			try {
				const key = await encryptionKeyVault.get(channelId);
				return await decryptMessage(data, key);
			} catch (err) {
				logger.error('Error during decrypt message:', err);
			}
		}

		return data as never;
	};

	const smartSend = async (channel: MiniBroadcast, payload: MessagePayload) => {
		if (encryptionKeyVault) {
			const key = await encryptionKeyVault.get(channel.name);

			await sendEncryptedMessage(payload, key, channel);
		} else {
			channel.postMessage(payload);
		}
	};

	const handleChannelIncoming = async (
		channel: MiniBroadcast,
		data: EncryptedMessage,
	) => {
		const revealed = await smartReveal(data, channel.name);
		const requestId = revealed?.requestId as string;
		const associatedRequest = requestHashmap[requestId];

		if (associatedRequest) {
			associatedRequest.resolve(revealed);
			delete requestHashmap[requestId];
		}
	};

	const getChannel = (id: string): MiniBroadcast => {
		if (channelHashmap[id]) return channelHashmap[id];

		if (runtime.isExtension) {
			const channel = runtime.connect({ name: id });

			channelHashmap[id] = channel;
			channel.onMessage.addListener((data) => {
				return handleChannelIncoming(channel, data);
			});
		} else {
			const channel = new BroadcastChannel(id);

			channelHashmap[id] = channel;
			channel.addEventListener(
				'message',
				({ data }: MessageEvent<EncryptedMessage>) => {
					return handleChannelIncoming(channel, data);
				},
			);
		}

		return channelHashmap[id];
	};

	const onMessage: MessengerMessageListener = (channelId, func) => {
		const channel = getChannel(channelId) as UniBroadcast;

		if (runtime.isExtension) {
			const listener = async (data: EncryptedMessage) => {
				return func(await smartReveal(data, channelId), channel);
			};

			channel.onMessage.addListener(listener);
		} else {
			const listener = async ({ data }: MessageEvent<EncryptedMessage>) => {
				return func(await smartReveal(data, channelId), channel);
			};

			channel.addEventListener('message', listener);
		}
	};

	const send: MessengerSend = async (channelId, payload) => {
		const channel = getChannel(channelId);

		await smartSend(channel, payload);
	};

	const request: MessengerRequest = (channelId, payload, timeout = 20000) => {
		if (!payload.requestId) payload.requestId = crypto.randomUUID();

		return new Promise((resolve, reject) => {
			const channel = getChannel(channelId);

			requestHashmap[payload.requestId as string] = {
				timestamp: new Date(),
				timeout,
				resolve,
				reject,
			};

			smartSend(channel, payload as MessagePayload);
		});
	};

	return {
		channels: channelHashmap,
		onMessage,
		request,
		send,
	};
};

export const sendEncryptedMessage = async <T extends MessagePayload>(
	payload: T,
	key: CryptoKey,
	from: MiniBroadcast,
): Promise<T> => {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const data = JSON.stringify(payload);
	const ciphered = await encryptToString(data, key, iv);
	const ivString = Buffer.from(iv).toString('base64');
	const message: EncryptedMessage = { ciphered, iv: ivString };

	from.postMessage(message);
	return payload;
};

export const decryptMessage = async <T extends MessagePayload>(
	message: EncryptedMessage,
	key: CryptoKey,
): Promise<T> => {
	const iv = new Uint8Array(Buffer.from(message.iv, 'base64'));
	const decrypted = await decryptFromString(message.ciphered, key, iv);

	return JSON.parse(decrypted) as T;
};
