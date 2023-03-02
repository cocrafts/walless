import { MessagingChannels } from '@walless/core';
import { createAndHydrateCryptoKey } from '@walless/crypto';
import { sendEncryptedMessage } from '@walless/messaging';
import { runtime } from 'webextension-polyfill';

console.log('popup script loaded!');

const start = async () => {
	const kernel = runtime.connect({ name: MessagingChannels.kernel });

	kernel.onMessage.addListener((message) => {
		console.log(message, '<-- message from kernel');
	});

	await createAndHydrateCryptoKey(kernel.name);
	await sendEncryptedMessage({ data: 'hello from popup!' }, kernel);
};

start();
