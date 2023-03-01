import { MessagingChannels } from '@walless/core';
import { runtime } from 'webextension-polyfill';

console.log('popup script loaded!');
const kernel = runtime.connect({ name: MessagingChannels.kernel });

kernel.postMessage({ data: 'heelo from popup!' });
kernel.onMessage.addListener((message) => {
	console.log(message, '<-- message from kernel');
});
