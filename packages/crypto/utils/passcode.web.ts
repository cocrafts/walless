import type { EncryptedWithPasscode } from '@walless/core';

import {
	getDeriveBits,
	getDeriveKey,
	getMaterialKey,
	getRandomBytes,
} from './helper';

export const encryptWithPasscode = async (
	passcode: string,
	key: Uint8Array,
	iterations = 100000,
	keylen = 32,
): Promise<EncryptedWithPasscode> => {
	const salt = getRandomBytes(16);
	const iv = getRandomBytes(16);
	const material = await getMaterialKey(passcode);
	const derivedBits = await getDeriveBits(salt, material, iterations, keylen);
	const derivedKey = await getDeriveKey(derivedBits);
	const mac = new Uint8Array(derivedBits.slice(16, 32));
	const algorithm: AesCtrParams = { name: 'AES-CTR', counter: iv, length: 128 };
	const encryptedKey = await crypto.subtle.encrypt(algorithm, derivedKey, key);

	return {
		iv: Buffer.from(iv).toString('hex'),
		ct: Buffer.from(new Uint8Array(encryptedKey)).toString('hex'),
		salt: Buffer.from(salt).toString('hex'),
		mac: Buffer.from(mac).toString('hex'),
	};
};

export const decryptWithPasscode = async (
	password: string,
	encrypted: EncryptedWithPasscode,
	iterations = 100000,
	keylen = 32,
) => {
	const salt = Buffer.from(encrypted.salt, 'hex');
	const iv = Buffer.from(encrypted.iv, 'hex');
	const ct = Buffer.from(encrypted.ct, 'hex');
	const mac = Buffer.from(encrypted.mac, 'hex');
	const material = await getMaterialKey(password);
	const deriveBits = await getDeriveBits(salt, material, iterations, keylen);
	const expectedMac = new Uint8Array(deriveBits.slice(16, 32));

	if (!mac.equals(Buffer.from(expectedMac))) {
		throw new Error('Could not decrypt key: bad password');
	}

	const derivedKey = await getDeriveKey(deriveBits);
	const algorithm: AesCtrParams = { name: 'AES-CTR', counter: iv, length: 128 };
	const decryptedKey = await crypto.subtle.decrypt(algorithm, derivedKey, ct);

	return new Uint8Array(decryptedKey);
};
