import { createMessenger } from '@walless/messaging';

const messenger = createMessenger(['content']);

export const initializeMessaging = async () => {
	console.log(messenger);
	messenger.onMessage('content', (payload) => {
		console.log(payload, '<- message from content');
	});

	setTimeout(() => {
		console.log('sending...');
		messenger.send('content', { message: 'hello' });
	}, 1000);
};
