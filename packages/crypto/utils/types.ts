export interface HydratedKey {
	jwk: JsonWebKey;
	keyParams: AesKeyGenParams;
	keyUsages: ReadonlyArray<KeyUsage>;
}

export type AesAlgorithm = 'AES-GCM' | 'AES-CBC' | 'AES-CTR';
export type AesKeyLength = 128 | 192 | 256;
