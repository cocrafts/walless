export const getRandomBytes = (length: number) => {
	return crypto.getRandomValues(new Uint8Array(length));
};

export const getMaterialKey = async (secret: string): Promise<CryptoKey> => {
	const secretBuffer = Buffer.from(secret, 'utf-8');
	return await crypto.subtle.importKey('raw', secretBuffer, 'PBKDF2', false, [
		'deriveBits',
	]);
};

export const getDeriveKey = async (
	deriveBits: ArrayBuffer,
): Promise<CryptoKey> => {
	return await crypto.subtle.importKey('raw', deriveBits, 'AES-CTR', false, [
		'encrypt',
		'decrypt',
	]);
};

export const getDeriveBits = async (
	salt: Uint8Array,
	keyMaterial: CryptoKey,
	iterations = 100000,
	keylen = 32,
): Promise<ArrayBuffer> => {
	const params: Pbkdf2Params = {
		name: 'PBKDF2',
		hash: 'SHA-256',
		salt,
		iterations,
	};

	return crypto.subtle.deriveBits(params, keyMaterial, keylen * 8);
};

export const fromHex = (hex: string): Uint8Array => {
	const byteMapper = (byte: string) => parseInt(byte, 16);
	const matchResult = hex.match(/.{1,2}/g)?.map(byteMapper) || [];

	return new Uint8Array(matchResult);
};
