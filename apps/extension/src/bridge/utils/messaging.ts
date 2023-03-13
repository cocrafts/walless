import { decryptMessage, EncryptedMessage } from '@walless/messaging';

import { encryptionKeyVault } from './alias';

export const unifiedOnMessage = (
	channel: chrome.runtime.Port & BroadcastChannel,
	cb: (payload: Record<string, unknown>) => void,
) => {
	const decryptAndCallback = async (data: EncryptedMessage) => {
		try {
			const key = await encryptionKeyVault.get(channel.name);
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
