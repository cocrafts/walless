import { MessagingChannels } from '@walless/core';
import { decryptMessage } from '@walless/messaging';
import { Runtime, runtime } from 'webextension-polyfill';

const onKernelMessage = async (message, sender: Runtime.Port) => {
	const payload = await decryptMessage(message, sender);
	console.log(payload, sender, '<-- kernel message');
};

runtime.onConnect.addListener((port) => {
	console.log('Connected to port:', port);

	port.postMessage({ message: 'Hello from background.js!' });

	if (port.name === MessagingChannels.kernel) {
		port.onMessage.addListener(onKernelMessage);
	}
});
