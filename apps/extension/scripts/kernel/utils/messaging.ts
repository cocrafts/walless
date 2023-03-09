import { Channels } from '@walless/messaging';
import { SettingRecord } from '@walless/storage';

export let notify: (payload) => void;

export const notifySetting = (setting: SettingRecord) => {
	notify(setting);
};

if (global.chrome?.runtime) {
	const kernel = chrome.runtime.connect({ name: Channels.kernel });

	notify = (payload) => {
		kernel.postMessage('hello world from background service');
		console.log('notify from Background', payload);
	};
} else {
	const kernel = new BroadcastChannel(Channels.kernel);

	notify = (payload) => {
		kernel.postMessage('hello world from service worker!');
		console.log('notify from service worker', payload);
	};
}
