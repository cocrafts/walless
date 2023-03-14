import { encryptionKeyVault } from '../utils/alias';
import { messenger } from '../utils/messaging';

import { handleUIMessage } from './ui';

export const registerMessageHandlers = async () => {
	messenger.onMessage('ui', handleUIMessage);

	await Promise.all([
		encryptionKeyVault.createAndHydrate('ui'),
		encryptionKeyVault.createAndHydrate('kernel'),
	]);
};
