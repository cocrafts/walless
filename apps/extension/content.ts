console.log('content.js: loaded');

const port = chrome.runtime.connect();
window.addEventListener(
	'message',
	(event) => {
		if (event.source !== window) return;

		if (event.data.type && event.data.type === 'FROM_PAGE') {
			console.log('content.js: received message from page:', event.data.text);
			chrome.runtime.sendMessage({ hello: 1 });
		}
	},
	false,
);
