import { createMessenger } from '@walless/messaging';

import { onKernelMessage } from '../handlers/kernel';

import { encryptionKeyVault, initializeVaultKeys } from './shared';

/* Mostly use messaging module to communicate,
 * support encrypted communication */
export const initializeMessaging = async (): Promise<void> => {
	await initializeVaultKeys();
	const encryptedMessenger = createMessenger(encryptionKeyVault);
	encryptedMessenger.onMessage('kernel', onKernelMessage);
};
