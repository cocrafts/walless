import { sendEncryptedMessage, UniversalBroadcast } from '@walless/messaging';
import { SettingRecord } from '@walless/storage';

import { encryptionKeyVault } from './storage';

type Notifier = (channelId: string, payload) => Promise<void>;

const notifyFactory = (
	makeChannel: (name: string) => UniversalBroadcast,
): Notifier => {
	const channels = {
		ui: makeChannel('ui'),
		kernel: makeChannel('kernel'),
	};

	return async (channelId, payload) => {
		const key = await encryptionKeyVault.get(channelId);
		await sendEncryptedMessage(payload, key, channels[channelId]);
	};
};

export const notify = global.chrome?.runtime
	? notifyFactory((name) => chrome.runtime.connect({ name }))
	: notifyFactory((name) => new BroadcastChannel(name));

export const notifySetting = (setting: SettingRecord) => {
	return notify('ui', setting);
};
