import { createMessenger } from '@walless/messaging';

import { encryptionKeyVault } from './storage';

export const messenger = createMessenger(encryptionKeyVault, ['ui', 'kernel']);
