import type { AesAlgorithm, AesKeyLength } from '@walless/core';

export const createCryptoKey = async (
	name: AesAlgorithm,
	length: AesKeyLength,
	keyUsages: ReadonlyArray<KeyUsage>,
): Promise<CryptoKey> => {
	const keyParams: AesKeyGenParams = { name, length };

	return await crypto.subtle.generateKey(keyParams, true, keyUsages);
};

export const encrypt = async (
	data: string,
	key: CryptoKey,
	iv: Uint8Array,
): Promise<ArrayBuffer> => {
	const plaintext = new TextEncoder().encode(data);
	const algorithm = { name: key.algorithm.name, iv };

	return await crypto.subtle.encrypt(algorithm, key, plaintext);
};

export const encryptToString = async (
	data: string,
	key: CryptoKey,
	iv: Uint8Array,
): Promise<string> => {
	const cipheredBytes = await encrypt(data, key, iv);

	return Buffer.from(cipheredBytes).toString('base64');
};

export const decrypt = async (
	ciphered: ArrayBuffer,
	key: CryptoKey,
	iv: Uint8Array,
): Promise<string> => {
	const algorithm = { name: key.algorithm.name, iv };
	const deciphered = await crypto.subtle.decrypt(algorithm, key, ciphered);

	return new TextDecoder().decode(deciphered);
};

export const decryptFromString = async (
	encrypted: string,
	key: CryptoKey,
	iv: Uint8Array,
): Promise<string> => {
	const bytes = new Uint8Array(Buffer.from(encrypted, 'base64'));

	return await decrypt(bytes, key, iv);
};
