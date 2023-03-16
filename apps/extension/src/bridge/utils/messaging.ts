import { createEncryptedMessenger } from '@walless/messaging';
import { encryptionKeyVault } from 'utils/storage';

export const encryptedMessenger = createEncryptedMessenger(encryptionKeyVault);
