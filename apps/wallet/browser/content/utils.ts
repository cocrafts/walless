import { createMessenger } from '@walless/messaging';

const messenger = createMessenger();

export const initializeMessaging = async () => {
	window.postMessage({ from: 'walless-content-script-loaded' });
	window.addEventListener(
		'message',
		async ({ source, data }): Promise<void> => {
			const { from, type } = data || {};
			if (!from || source !== window) return;

			if (from.startsWith('walless@sdk')) {
				if (type == 'sign-in-response') {
					await chrome.runtime.sendMessage(data);
				} else {
					// TODO: use timeout from sdk that include in data
					const response = await messenger.request('kernel', data);

					window.postMessage(response);
				}
			}
		},
		false,
	);
};

export const injectScript = (scriptUri: string) => {
	try {
		const container = document.head || document.documentElement;
		const scriptTag = document.createElement('script');
		scriptTag.setAttribute('async', 'false');
		scriptTag.src = chrome.runtime.getURL(scriptUri);
		container.insertBefore(scriptTag, container.children[0]);
		container.removeChild(scriptTag);
	} catch (error) {
		console.error('script injection failed.', error);
	}
};
