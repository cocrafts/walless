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
	port: Runtime.Port,
	payload: T,
) => {
	const key = await restructCryptoKey('salt');
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const data = JSON.stringify(payload);
	const ciphered = await encryptToString(data, key, iv);
	const ivString = new Buffer(iv).toString('base64');
	const message: MessagePayload = { ciphered, iv: ivString };

	return port.postMessage(message);
};

export const decryptMessage = async <T>(
	message: MessagePayload,
): Promise<T> => {
	const key = await restructCryptoKey('salt');
	const iv = new Uint8Array(Buffer.from(message.iv, 'base64'));
	const decrypted = await decryptFromString(message.ciphered, key, iv);

	return JSON.parse(decrypted) as T;
};
