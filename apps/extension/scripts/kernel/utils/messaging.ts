import { sendEncryptedMessage, UniversalBroadcast } from '@walless/messaging';
import { SettingRecord } from '@walless/storage';

import { getEncryptionKey, RegisteredChannel } from './encryption';

type Notifier = (channelId: RegisteredChannel, payload) => Promise<void>;

const notifyFactory = (
	makeChannel: (name: RegisteredChannel) => UniversalBroadcast,
): Notifier => {
	const channels = {
		ui: makeChannel('ui'),
		kernel: makeChannel('kernel'),
	};

	return async (channelId, payload) => {
		const key = await getEncryptionKey(channelId);
		await sendEncryptedMessage(payload, key, channels[channelId]);
	};
};

export const notify = global.chrome?.runtime
	? notifyFactory((name) => chrome.runtime.connect({ name }))
	: notifyFactory((name) => new BroadcastChannel(name));

export const notifySetting = (setting: SettingRecord) => {
	return notify('ui', setting);
};
