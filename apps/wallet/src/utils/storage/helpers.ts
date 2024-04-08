import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';

const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'; // a string from sui lib

export const retryDecodeSuiPrivateKey = (privateKeyStr: string) => {
	const alphabetList = ALPHABET.split('');
	for (const char of alphabetList) {
		try {
			privateKeyStr = privateKeyStr.slice(0, -1) + char;
			const decodedPrivKey = decodeSuiPrivateKey(privateKeyStr);
			return decodedPrivKey;
		} catch {
			continue;
		}
	}
	throw new Error('Unable to decode');
};
