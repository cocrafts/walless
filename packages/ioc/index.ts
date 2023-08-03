import type { Engine } from '@walless/engine';
import type { EncryptionKeyVault } from '@walless/messaging';
import type { Database } from '@walless/store';

export interface DynamicModules {
	engine: Engine;
	storage: Database;
	encryptionKeyVault: EncryptionKeyVault;
}

export const modules: DynamicModules = {} as never;
