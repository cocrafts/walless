import { type EncryptionKeyDocument, Database } from '@walless/store';

import {
	type CreateAndHydrateKeyVault,
	type EncryptionKeyVault,
	type GetKeyVault,
} from './types';

export const createEncryptionKeyVault = (db: Database): EncryptionKeyVault => {
	const get: GetKeyVault = async (id) => {
		const hydrated = await db.safeGet<EncryptionKeyDocument>(id);
		if (!hydrated) throw new Error(`Encryption key not found for ${id}`);

		return await crypto.subtle.importKey(
			'jwk',
			hydrated.jwk,
			hydrated.keyParams,
			true,
			hydrated.keyUsages,
		);
	};

	const createAndHydrate: CreateAndHydrateKeyVault = async (id) => {
		const keyParams: AesKeyGenParams = { name: 'AES-GCM', length: 256 };
		const keyUsages: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];
		const key = await crypto.subtle.generateKey(keyParams, true, keyUsages);
		const jwk = await crypto.subtle.exportKey('jwk', key);
		const hydrated: EncryptionKeyDocument = {
			_id: id,
			type: 'EncryptionKey',
			jwk,
			keyParams,
			keyUsages,
		};

		await db.upsert(id, async () => hydrated);
		return key;
	};

	return {
		get,
		createAndHydrate,
	};
};
