/* eslint-disable */
import {
	decryptFromString,
	encryptToString,
	restructCryptoKey,
} from '@walless/crypto';

import { registerRequest } from './engine';
import { EncryptedMessage, MessagePayload, ResponsePayload } from './types';

export const sendMessage = async <T extends MessagePayload>(
	payload: T,
	from: chrome.runtime.Port,
) => {
	if (!payload.id) payload.id = crypto.randomUUID();
	const key = await restructCryptoKey(`key@${from.name}`);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const data = JSON.stringify(payload);
	const ciphered = await encryptToString(data, key, iv);
	const ivString = Buffer.from(iv).toString('base64');
	const message: EncryptedMessage = { ciphered, iv: ivString };

	from.postMessage(message);
	return payload;
};

export const sendRequest = async <
	T extends MessagePayload,
	R extends ResponsePayload,
>(
	payload: T,
	from: chrome.runtime.Port,
): Promise<R> => {
	return new Promise((resolve, reject) => {
		//
	});
};

export const decryptMessage = async <T extends MessagePayload>(
	message: EncryptedMessage,
	sender: chrome.runtime.Port,
): Promise<T> => {
	const key = await restructCryptoKey(`key@${sender.name}`);
	const iv = new Uint8Array(Buffer.from(message.iv, 'base64'));
	const decrypted = await decryptFromString(message.ciphered, key, iv);

	return JSON.parse(decrypted) as T;
};
