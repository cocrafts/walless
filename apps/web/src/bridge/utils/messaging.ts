import { modules } from '@walless/ioc';
import { createMessenger } from '@walless/messaging';

export const encryptedMessenger = createMessenger(modules.encryptionKeyVault);
