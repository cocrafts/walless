import { decryptFromString, encryptToString } from '@walless/crypto';

import {
	EncryptedMessage,
	MessagePayload,
	ResponsePayload,
	UniversalBroadcast,
} from './types';

export const sendEncryptedMessage = async <T extends MessagePayload>(
	payload: T,
	key: CryptoKey,
	from: UniversalBroadcast,
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
	from: UniversalBroadcast,
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
