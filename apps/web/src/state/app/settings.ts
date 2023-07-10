import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

const id = 'settings';

export const setPrivacy = async (hideBalance: boolean) => {
	await modules.storage.upsert<SettingDocument>(id, async (doc) => {
		doc.config.hideBalance = hideBalance;

		return doc;
	});
};

export const setPathname = async (latestScreen: string) => {
	await modules.storage.upsert<SettingDocument>(id, async (doc) => {
		doc.config.latestLocation = latestScreen;

		return doc;
	});
};
