export interface HydratedKey {
	jwk: JsonWebKey;
	keyParams: AesKeyGenParams;
	keyUsages: ReadonlyArray<KeyUsage>;
}

export type AesAlgorithm = 'AES-GCM' | 'AES-CBC' | 'AES-CTR';
export type AesKeyLength = 128 | 192 | 256;

export interface EncryptedPrivateKey {
	iv: string;
	salt: string;
	ct: string;
	mac: string;
}

export interface PrivateKeyEncryptionOptions {
	password: string;
	key: Buffer;
	iterations?: number;
	keylen?: number;
}

export type PrivateKeyDecryptionOptions = Omit<
	PrivateKeyEncryptionOptions,
	'key'
> & {
	encryptedKey: EncryptedPrivateKey;
};
