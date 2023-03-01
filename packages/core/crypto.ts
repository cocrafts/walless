const { subtle, getRandomValues } = crypto;

interface KeyIVOptions {
	algorithm: string;
	keyLength: number;
	ivLength: number;
}

export interface KeyIV {
	options: KeyIVOptions;
	key: CryptoKey;
	iv: Uint8Array;
}

export type AesKeyLength = 128 | 192 | 256;

export const generateKeyIV = async (
	keyLength: AesKeyLength = 256,
	ivLength = 12,
): Promise<KeyIV> => {
	const algorithm: AesKeyGenParams = { name: 'AES-GCM', length: keyLength };
	const keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];
	const key = await subtle.generateKey(algorithm, true, keyUsages);
	const iv = getRandomValues(new Uint8Array(12));

	return {
		options: { algorithm: algorithm.name, ivLength, keyLength },
		key,
		iv,
	};
};

export const encryptAes = async (
	data: string,
	{ options, key, iv }: KeyIV,
): Promise<ArrayBuffer> => {
	const plaintext = new TextEncoder().encode(data);
	const algorithm = { name: options.algorithm, iv };

	return await subtle.encrypt(algorithm, key, plaintext);
};

export const decryptAes = async (
	ciphered: ArrayBuffer,
	{ options, key, iv }: KeyIV,
): Promise<string> => {
	const algorithm = { name: options.algorithm, iv };
	const deciphered = await subtle.decrypt(algorithm, key, ciphered);

	return new TextDecoder().decode(deciphered);
};
