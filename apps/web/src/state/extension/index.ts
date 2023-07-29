import { modules } from '@walless/ioc';
import type { ExtensionDocument } from '@walless/store';
import { mockLayoutCards } from 'scripts/kernel/utils/mockExtension';

import { extensionState } from './internal';

export const extensionActions = {
	setExtensions: (extensions: ExtensionDocument[]) => {
		for (const extension of extensions) {
			extensionState.map.set(extension._id, extension);
		}
	},

	getExtensionById: async (id: string) => {
		return await getExtension(id);
	},

	checkInstalledExtensionById: async (id: string) => {
		const extension = await modules.storage.safeGet<ExtensionDocument>(id);

		return extension ? true : false;
	},

	addExtensionsById: async (id: string) => {
		const extensionDoc = await getExtension(id);
		if (!extensionDoc) {
			return;
		}

		await modules.storage.put<ExtensionDocument>(extensionDoc);
	},
};

const getExtension = async (id: string) => {
	return await mockLayoutCards.find((card) => card._id === id);
};

export * from './internal';
