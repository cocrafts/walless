import { encryptedMessenger } from '../utils/messaging';

export const registerMessageHandlers = async () => {
	setTimeout(async () => {
		await encryptedMessenger.send('kernel', { message: 'hello, from bridge!' });
	}, 2000);
};
