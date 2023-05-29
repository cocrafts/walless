import { modules } from '@walless/ioc';
import { type SettingDocument } from '@walless/store';
import { appState } from 'state/app';

const id = 'settings';

export const settingsActions = {
	setConfigs: (settings: SettingDocument) => {
		if (settings._id) {
			appState.settingConfig = settings.config;
		}
	},
	setPrivacy: async ({ hideBalance }: { hideBalance: boolean }) => {
		await modules.storage.upsert<SettingDocument>(id, async (doc) => {
			doc.config.hideBalance = hideBalance;

			return doc;
		});
	},
};
