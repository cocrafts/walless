import { Channels, createEncryptedMessenger } from '@walless/messaging';

import { encryptionKeyVault } from './storage';

const channels = [
	Channels.ui,
	Channels.background,
	Channels.kernel,
	Channels.popup,
	Channels.content,
];

export const encryptedMessenger = createEncryptedMessenger(
	channels,
	encryptionKeyVault,
);

export const initializeMessaging = async (): Promise<void> => {
	for (const id of channels) {
		await encryptionKeyVault.createAndHydrate(id);
	}

	encryptedMessenger.onMessage('kernel', (payload) => {
		console.log(payload, '<-- kernel received message');
	});
};
