import { createMessenger } from '@walless/messaging';

const messenger = createMessenger(['ui', 'content', 'kernel']);

export const initializeMessaging = async () => {
	global.postMessage({ from: 'walless-content-script-loaded' });

	await messenger.send('content', { message: 'hello world!' });
	messenger.onMessage('kernel', (payload) => {
		console.log(payload, '<<-- from kernel');
	});

	global.addEventListener(
		'message',
		async ({ source, data }) => {
			if (source !== window) return;

			if (data.from?.startsWith('walless@')) {
				await messenger.send('ui', data);
			}
		},
		false,
	);
};
