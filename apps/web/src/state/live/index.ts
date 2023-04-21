import { PouchDocument } from '@walless/store';
import { db } from 'utils/pouch';

import { extensionActions, extensionState } from '../extension';

export const initializeStateSync = async () => {
	const extensionResponse = await db.find({ selector: { type: 'Extension' } });

	extensionActions.setExtensions(extensionResponse.docs as never);

	const changes = db.changes({
		since: 'now',
		live: true,
		include_docs: true,
	});

	changes.on('change', ({ id, doc, deleted }) => {
		const item = doc as PouchDocument<object>;

		if (deleted) {
			if (item?.type === 'Extension') {
				extensionState.map.delete(id);
			}
		} else {
			if (item?.type === 'Extension') {
				extensionState.map.set(id, item as never);
			}
		}
	});
};
