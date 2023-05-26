import { modules } from '@walless/ioc';
import { type SettingDocument } from '@walless/store';

import { settingState } from './internal';

export const settingsActions = {
	setSettings: (settings: SettingDocument) => {
		if (settings._id) {
			settingState._id = settings._id;
			settingState.hideBalance = settings.hideBalance;
		}
	},
	updateHiddenBalanceSettings: async ({
		_id,
		hideBalance,
	}: {
		_id: string;
		hideBalance: boolean;
	}) => {
		await modules.storage.upsert<SettingDocument>(_id, async (doc) => {
			doc.hideBalance = hideBalance;

			return doc;
		});
	},
};

export * from './internal';
