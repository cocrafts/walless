import { Channels } from '@walless/messaging';

import { encryptionKeyVault } from '../utils/alias';
import { unifiedOnMessage } from '../utils/messaging';

import { handleUIMessage } from './ui';

export const registerMessageHandlers = async () => {
	const channels = {
		ui: new BroadcastChannel(Channels.ui),
	};

	unifiedOnMessage(channels.ui as never, handleUIMessage);

	await Promise.all([
		encryptionKeyVault.createAndHydrate('ui'),
		encryptionKeyVault.createAndHydrate('kernel'),
	]);
};
