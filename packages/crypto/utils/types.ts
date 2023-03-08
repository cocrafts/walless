export interface HydratedKey {
	jwk: JsonWebKey;
	keyParams: AesKeyGenParams;
	keyUsages: ReadonlyArray<KeyUsage>;
}

export type AesAlgorithm = 'AES-GCM' | 'AES-CBC' | 'AES-CTR';
export type AesKeyLength = 128 | 192 | 256;

export interface EncryptedWithPasscode {
	iv: string;
	salt: string;
	ct: string;
	mac: string;
}

export interface PrivateKeyEncryptionOptions {
	password: string;
	key: Uint8Array;
	iterations?: number;
	keylen?: number;
}

export type PrivateKeyDecryptionOptions = Omit<
	PrivateKeyEncryptionOptions,
	'key'
> & {
	encryptedKey: EncryptedWithPasscode;
};
