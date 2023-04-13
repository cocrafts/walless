import { createMessenger } from '@walless/messaging';
import { encryptionKeyVault } from 'utils/storage';

export const encryptedMessenger = createMessenger(encryptionKeyVault);
