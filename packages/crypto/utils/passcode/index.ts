import {
	createCipheriv,
	createDecipheriv,
	createHmac,
	pbkdf2Sync,
	randomBytes,
} from 'crypto';

import type { EncryptedWithPasscode } from '@walless/core';

export const encryptWithPasscode = async (
	passcode: string,
	data: Uint8Array,
	iterations = 100000,
	keylen = 32,
): Promise<EncryptedWithPasscode> => {
	const salt = randomBytes(16);
	const iv = randomBytes(16);
	const key = pbkdf2Sync(passcode, salt, iterations, keylen, 'sha256');
	const cipher = createCipheriv('aes-256-gcm', key, iv);
	const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
	const hmacKey = pbkdf2Sync(passcode, salt, iterations, keylen, 'sha256');
	const hmac = createHmac('sha256', hmacKey);
	hmac.update(encryptedData);

	return {
		iv: iv.toString('hex'),
		ct: encryptedData.toString('hex'),
		salt: salt.toString('hex'),
		mac: hmac.digest('hex'),
	};
};

export const decryptWithPasscode = async (
	passcode: string,
	encrypted: EncryptedWithPasscode,
	iterations = 100000,
	keylen = 32,
) => {
	const salt = Buffer.from(encrypted.salt, 'hex');
	const iv = Buffer.from(encrypted.iv, 'hex');
	const key = pbkdf2Sync(passcode, salt, iterations, keylen, 'sha256');
	const hmacKey = pbkdf2Sync(passcode, salt, iterations, keylen, 'sha256');
	const hmac = createHmac('sha256', hmacKey);
	hmac.update(Buffer.from(encrypted.ct, 'hex'));
	const computedMac = hmac.digest('hex');

	if (computedMac !== encrypted.mac) {
		throw new Error('Invalid MAC: Data may have been tampered with');
	}

	const decipher = createDecipheriv('aes-256-gcm', key, iv);
	const decryptedData = Buffer.concat([
		decipher.update(Buffer.from(encrypted.ct, 'hex')),
		decipher.final(),
	]);

	return new Uint8Array(decryptedData);
};
