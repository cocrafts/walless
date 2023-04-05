import { createMessenger } from '@walless/messaging';

const messenger = createMessenger();

export const initializeMessaging = async () => {
	window.postMessage({ from: 'walless-content-script-loaded' });
	window.addEventListener(
		'message',
		async ({ source, data }) => {
			const { from, type } = data || {};
			if (!from || source !== window) return;

			if (from.startsWith('walless@sdk')) {
				if (type == 'sign-in-response') {
					await chrome.runtime.sendMessage(data);
				} else {
					const response = await messenger.request('kernel', data);

					window.postMessage(response);
				}
			}
		},
		false,
	);
};
