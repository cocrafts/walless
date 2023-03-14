import { encryptionKeyVault } from '../utils/alias';
import { encryptedMessenger } from '../utils/messaging';

import { handleUIMessage } from './ui';

export const registerMessageHandlers = async () => {
	encryptedMessenger.onMessage('ui', handleUIMessage);

	await Promise.all([
		encryptionKeyVault.createAndHydrate('ui'),
		encryptionKeyVault.createAndHydrate('kernel'),
	]);
};
