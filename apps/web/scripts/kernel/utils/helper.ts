import { modules } from '@walless/ioc';
import type { ExtensionDocument } from '@walless/store';

import { mockLayoutCards } from './mockExtension';

export const getExtensionById = async (id: string) => {
	return await mockLayoutCards.find((card) => card._id === id);
};

export const addExtensionsById = async (id: string) => {
	const extensionDoc = await getExtensionById(id);
	if (!extensionDoc) {
		return;
	}

	await modules.storage.put<ExtensionDocument>(extensionDoc);
};

