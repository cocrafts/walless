import { getEncryptionKeyVault } from '@walless/messaging';
import { createStorage } from '@walless/storage';

export const db = createStorage();
export const encryptionKeyVault = getEncryptionKeyVault(db);
