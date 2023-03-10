import { EncryptionKeyRecord, WallessDB } from '@walless/storage';

export const getEncryptionKeyVault = (db: WallessDB) => {
	const get = async (id: string): Promise<CryptoKey> => {
		const hydrated = await db.encryptionKeys.get(id);
		if (!hydrated) throw new Error(`Encryption key not found for ${id}`);

		return await crypto.subtle.importKey(
			'jwk',
			hydrated.jwk,
			hydrated.keyParams,
			true,
			hydrated.keyUsages,
		);
	};

	const createAndHydrate = async (id: string): Promise<CryptoKey> => {
		const keyParams: AesKeyGenParams = { name: 'AES-GCM', length: 256 };
		const keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];
		const key = await crypto.subtle.generateKey(keyParams, true, keyUsages);
		const jwk = await crypto.subtle.exportKey('jwk', key);
		const hydrated: EncryptionKeyRecord = { id, jwk, keyParams, keyUsages };

		await db.encryptionKeys.put(hydrated);
		return key;
	};

	return {
		get,
		createAndHydrate,
	};
};
