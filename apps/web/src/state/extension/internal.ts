import { ExtensionRecord } from '@walless/storage';
import { liveQuery } from 'dexie';
import { db } from 'utils/storage';
import { proxy } from 'valtio';

export interface ExtensionState {
	extensions: ExtensionRecord[];
}

export const extensionState = proxy<ExtensionState>({
	extensions: [],
});

export const initializeExtensionState = async () => {
	const allItemsObservable = liveQuery(() => db.extensions.toArray());

	allItemsObservable.subscribe((keys) => {
		extensionState.extensions = keys;
	});
};
