import { Channels, decryptMessage, EncryptedMessage } from '@walless/messaging';

import {
	createAndHydrateEncryptionKey,
	getEncryptionKey,
} from '../../../scripts/kernel/utils/encryption';

const handleUIMessage = (payload: Record<string, unknown>) => {
	console.log('message from ui:', payload);
};

const unifiedOnMessage = (
	channel: chrome.runtime.Port & BroadcastChannel,
	cb: (payload: Record<string, unknown>) => void,
) => {
	const decryptAndCallback = async (data: EncryptedMessage) => {
		try {
			const key = await getEncryptionKey(channel.name);
			const message = await decryptMessage(data, key);

			cb(message);
		} catch (err) {
			console.log('Error during decrypt message:', err);
		}
	};

	if (channel.onMessage) {
		(channel as chrome.runtime.Port).onMessage.addListener(
			(data: EncryptedMessage) => decryptAndCallback(data),
		);
	} else {
		(channel as BroadcastChannel).addEventListener(
			'message',
			async ({ data }: MessageEvent<EncryptedMessage>) =>
				decryptAndCallback(data),
		);
	}
};

export const registerMessageHandlers = async () => {
	const channels = {
		ui: new BroadcastChannel(Channels.ui),
	};

	unifiedOnMessage(channels.ui as never, handleUIMessage);

	await Promise.all([
		createAndHydrateEncryptionKey('ui'),
		createAndHydrateEncryptionKey('kernel'),
	]);
};
