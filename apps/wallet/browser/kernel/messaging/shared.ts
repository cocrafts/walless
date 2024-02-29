import { Channels, createEncryptionKeyVault } from '@walless/messaging';
import { storage } from 'utils/storage/db';

export const channels = [
	Channels.ui,
	Channels.background,
	Channels.kernel,
	Channels.popup,
	Channels.content,
];

export const encryptionKeyVault = createEncryptionKeyVault(storage);

export const initializeVaultKeys = async () => {
	return Promise.all(channels.map(encryptionKeyVault.createAndHydrate));
};
