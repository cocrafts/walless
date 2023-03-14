import { messenger } from './utils/messaging';
import { db } from './utils/storage';

db.settings.hook('updating', async (updates, id, previous) => {
	const united = { ...previous, ...updates };

	if (id === 1) {
		await messenger.send('ui', united);
	}
});
