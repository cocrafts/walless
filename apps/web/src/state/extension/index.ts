import { ExtensionDocument } from '@walless/store';

import { extensionState } from './internal';

export const extensionActions = {
	setExtensions: (extensions: ExtensionDocument[]) => {
		for (const extension of extensions) {
			extensionState.map.set(extension._id, extension);
		}
	},
};

export * from './internal';
