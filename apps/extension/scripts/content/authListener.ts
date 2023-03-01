import { runtime } from 'webextension-polyfill';

export const observeAuthentication = () => {
	window.postMessage({ from: 'walless@content-script-loaded' });
	window.addEventListener(
		'message',
		async ({ source, data }) => {
			if (source !== window) return;

			if (data.from?.startsWith('walless@')) {
				await runtime.sendMessage(data);
			}
		},
		false,
	);
};
