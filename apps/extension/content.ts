console.log('content.js: loaded');

const port = chrome.runtime.connect();
window.addEventListener(
	'message',
	({ source, data }) => {
		if (source !== window) return;

		if (data.from?.startsWith('walless@')) {
			chrome.runtime.sendMessage(data);
		}
	},
	false,
);
