import { createMessenger } from '@walless/messaging';

const messenger = createMessenger();

export const initializeMessaging = async () => {
	global.postMessage({ from: 'walless-content-script-loaded' });
	global.addEventListener(
		'message',
		async ({ source, data }) => {
			const from = data?.from;
			if (!from || source !== window) return;

			if (from === 'walless@sign-in-response') {
				await chrome.runtime.sendMessage(data);
			} else if (from.startsWith('walless@')) {
				await messenger.send('kernel', data);
			}
		},
		false,
	);
};
