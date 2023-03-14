import { createMessenger } from '@walless/messaging';

import { encryptionKeyVault } from './alias';

export const messenger = createMessenger(encryptionKeyVault, ['ui']);
