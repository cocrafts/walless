import { modules } from '@walless/ioc';
import { type SettingDocument } from '@walless/store';

import { settingState } from './internal';

export const settingsActions = {
	setSettings: (settings: SettingDocument) => {
		if (settings?._id) {
			settingState._id = settings._id;
			settingState._rev = settings._rev;
			settingState.isPrivate = settings.isPrivate;
		}
	},
	updatePrivateSettings: async ({
		_id,
		isPrivate,
	}: {
		_id: string;
		isPrivate: boolean;
	}) => {
		await modules.storage.upsert<SettingDocument>(_id, async (doc) => {
			doc.isPrivate = isPrivate;

			return doc;
		});
	},
};

export * from './internal';
