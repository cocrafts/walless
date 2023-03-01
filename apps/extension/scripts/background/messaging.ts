import { MessagingChannels } from '@walless/core';
import { runtime } from 'webextension-polyfill';

const onKernelMessage = (message, sender) => {
	console.log(message, sender, '<-- kernel message');
};

runtime.onConnect.addListener((port) => {
	console.log('Connected to port:', port);

	port.postMessage({ message: 'Hello from background.js!' });

	if (port.name === MessagingChannels.kernel) {
		port.onMessage.addListener(onKernelMessage);
	}
});
