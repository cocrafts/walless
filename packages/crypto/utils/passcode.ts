import { EncryptedPrivateKey, PrivateKeyEncryptionOptions } from './types';

export const encryptPrivateKey = async ({
	password,
	key,
	iterations = 100000,
	keylen = 32,
}: PrivateKeyEncryptionOptions): Promise<EncryptedPrivateKey> => {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(16));
	const importedKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits'],
	);

	const derivedArray = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt,
			iterations,
			hash: 'SHA-256',
		},
		importedKey,
		keylen * 8,
	);

	const derivedKey = await crypto.subtle.importKey(
		'raw',
		derivedArray,
		{ name: 'AES-CTR' },
		false,
		['encrypt', 'decrypt'],
	);

	const encryptedKey = await crypto.subtle.encrypt(
		{
			name: 'AES-CTR',
			counter: iv,
			length: 256,
		},
		derivedKey,
		key,
	);

	const mac = new Uint8Array(derivedArray.slice(16, 32));

	return {
		iv: Buffer.from(iv).toString('hex'),
		ct: Buffer.from(new Uint8Array(encryptedKey)).toString('hex'),
		salt: Buffer.from(salt).toString('hex'),
		mac: Buffer.from(mac).toString('hex'),
	};
};

export const decryptPrivateKey = async (
	password: string,
	encrypted: EncryptedPrivateKey,
	iterations = 100000,
	keylen = 32,
) => {
	const salt = Buffer.from(encrypted.salt, 'hex');
	const iv = Buffer.from(encrypted.iv, 'hex');
	const ct = Buffer.from(encrypted.ct, 'hex');
	const mac = Buffer.from(encrypted.mac, 'hex');

	const importedKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits'],
	);

	const derivedArray = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt,
			iterations,
			hash: 'SHA-256',
		},
		importedKey,
		keylen * 8,
	);

	const expectedMac = new Uint8Array(derivedArray.slice(16, 32));

	if (!mac.equals(Buffer.from(expectedMac))) {
		throw new Error('Could not decrypt key: bad password');
	}

	const derivedKey = await crypto.subtle.importKey(
		'raw',
		derivedArray,
		{ name: 'AES-CTR' },
		false,
		['encrypt', 'decrypt'],
	);

	const decryptedKey = await crypto.subtle.decrypt(
		{
			name: 'AES-CTR',
			counter: iv,
			length: 256,
		},
		derivedKey,
		ct,
	);

	return Buffer.from(new Uint8Array(decryptedKey));
};
