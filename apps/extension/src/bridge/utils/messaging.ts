import { createEncryptedMessenger } from '@walless/messaging';

import { encryptionKeyVault } from './alias';

export const encryptedMessenger = createEncryptedMessenger(
	['ui'],
	encryptionKeyVault,
);
