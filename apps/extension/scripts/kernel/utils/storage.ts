import { createStorage } from '@walless/storage';

import { notifySetting } from './messaging';

const { settings } = createStorage();

settings.hook('updating', (updates, id, previous) => {
	const united = { ...previous, ...updates };

	if (id === 1) {
		notifySetting(united);
	}
});
