import {
	decryptFromString,
	encryptToString,
	restructCryptoKey,
} from '@walless/crypto';
import { Runtime } from 'webextension-polyfill';

interface MessagePayload {
	ciphered: string;
	iv: string;
}

export const sendEncryptedMessage = async <T>(
	payload: T,
	from: Runtime.Port,
) => {
	const key = await restructCryptoKey(`key@${from.name}`);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const data = JSON.stringify(payload);
	const ciphered = await encryptToString(data, key, iv);
	const ivString = new Buffer(iv).toString('base64');
	const message: MessagePayload = { ciphered, iv: ivString };

	return from.postMessage(message);
};

export const decryptMessage = async <T>(
	message: MessagePayload,
	sender: Runtime.Port,
): Promise<T> => {
	const key = await restructCryptoKey(`key@${sender.name}`);
	const iv = new Uint8Array(Buffer.from(message.iv, 'base64'));
	const decrypted = await decryptFromString(message.ciphered, key, iv);

	return JSON.parse(decrypted) as T;
};
