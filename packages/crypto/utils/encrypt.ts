import { storage } from 'webextension-polyfill';

export interface HydratedKey {
	jwk: JsonWebKey;
	keyParams: AesKeyGenParams;
	keyUsages: ReadonlyArray<KeyUsage>;
}

export type AesAlgorithm = 'AES-GCM' | 'AES-CBC' | 'AES-CTR';
export type AesKeyLength = 128 | 192 | 256;

export const createCryptoKey = async (
	name: AesAlgorithm,
	length: AesKeyLength,
	keyUsages: ReadonlyArray<KeyUsage>,
): Promise<CryptoKey> => {
	const keyParams: AesKeyGenParams = { name, length };

	return await crypto.subtle.generateKey(keyParams, true, keyUsages);
};

export const createAndHydrateCryptoKey = async (
	id: string,
	name: AesAlgorithm = 'AES-GCM',
	length: AesKeyLength = 256,
	keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'],
): Promise<CryptoKey> => {
	const keyParams: AesKeyGenParams = { name, length };
	const key = await crypto.subtle.generateKey(keyParams, true, keyUsages);
	const jwk = await crypto.subtle.exportKey('jwk', key);
	const hydrated: HydratedKey = { jwk, keyParams, keyUsages };

	await storage.local.set({ [id]: JSON.stringify(hydrated) });
	return key;
};

export const restructCryptoKey = async (id: string): Promise<CryptoKey> => {
	const result = await storage.local.get([id]);
	const hydrated: HydratedKey = JSON.parse(result[id]);

	return await crypto.subtle.importKey(
		'jwk',
		hydrated.jwk,
		hydrated.keyParams,
		true,
		hydrated.keyUsages,
	);
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

	return new Buffer(cipheredBytes).toString('base64');
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
