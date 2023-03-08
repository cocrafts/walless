import { Channels, decryptMessage, EncryptedMessage } from '@walless/messaging';

const onKernelMessage = async (
	message: EncryptedMessage,
	sender: chrome.runtime.Port,
) => {
	const payload = await decryptMessage(message, sender);
	console.log(payload, sender, '<-- kernel message');
};

const onBackgroundMessage = async (
	message: EncryptedMessage,
	sender: chrome.runtime.Port,
) => {
	const payload = await decryptMessage(message, sender);
	console.log(payload, sender, '<-- background message');
};

chrome.runtime.onConnect.addListener((port) => {
	console.log('Connected to port:', port);

	port.postMessage({ message: 'Hello from background.js!' });

	if (port.name === Channels.kernel) {
		port.onMessage.addListener(onKernelMessage);
	} else if (port.name === Channels.background) {
		port.onMessage.addListener(onBackgroundMessage);
	}
});
