import { createEncryptionKeyVault } from '@walless/messaging';
import { createStorage } from '@walless/storage';

export const db = createStorage();
export const encryptionKeyVault = createEncryptionKeyVault(db);
