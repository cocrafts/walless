import { encryptedMessenger } from './messaging';
import { db } from './storage';

export const initializeHooks = () => {
	db.settings.hook('updating', async (updates, id, previous) => {
		const united = { ...previous, ...updates };

		if (id === 1) {
			await encryptedMessenger.send('ui', united);
		}
	});
};
