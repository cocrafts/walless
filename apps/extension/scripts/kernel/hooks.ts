import { notifySetting } from './utils/messaging';
import { db } from './utils/storage';

db.settings.hook('updating', (updates, id, previous) => {
	const united = { ...previous, ...updates };

	if (id === 1) {
		notifySetting(united);
	}
});
