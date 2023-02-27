import { runtime } from 'webextension-polyfill';

console.log('content.js: loaded');
const port = runtime.connect();

window.addEventListener(
	'message',
	({ source, data }) => {
		if (source !== window) return;

		if (data.from?.startsWith('walless@')) {
			runtime.sendMessage(data);
		}
	},
	false,
);

window.postMessage({ from: 'walless@content-script-loaded' });
