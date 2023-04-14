import { encryptedMessenger } from 'bridge/utils/messaging';

export const registerMessageHandlers = async () => {
	setTimeout(async () => {
		await encryptedMessenger.send('kernel', { type: 'notify-wallet-open' });
	}, 50);
};
