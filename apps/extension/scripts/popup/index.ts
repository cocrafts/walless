import { createAndHydrateCryptoKey } from '@walless/crypto';
import { Channels, sendMessage } from '@walless/messaging';

console.log('popup script loaded!');

const start = async () => {
	const kernel = chrome.runtime.connect({ name: Channels.kernel });

	kernel.onMessage.addListener((message) => {
		console.log(message, '<-- message from kernel');
	});

	await createAndHydrateCryptoKey(kernel.name);
	const payload = await sendMessage({ data: 'hello from popup!' }, kernel);

	console.log(payload);
};

start();
