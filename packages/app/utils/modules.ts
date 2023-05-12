import { type EncryptionKeyVault } from '@walless/messaging';
import { type Database } from '@walless/store';

export interface Modules {
	storage: Database;
	encryptionKeyVault: EncryptionKeyVault;
}

export const modules: Modules = {} as never;
