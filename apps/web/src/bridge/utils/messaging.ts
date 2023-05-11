import { createMessenger } from '@walless/messaging';
import modules from 'utils/modules';

export const encryptedMessenger = createMessenger(modules.encryptionKeyVault);
