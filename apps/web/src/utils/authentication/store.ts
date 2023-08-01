import type { UserProfile } from '@walless/core';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

export const setProfile = async (profile: UserProfile) => {
	await modules.storage.upsert<SettingDocument>('settings', async (doc) => {
		doc.type = 'Setting';
		doc.version = '0.0.1';
		doc.profile = profile;
		doc.config = {
			hideBalance: true,
			latestLocation: '/',
		};

		return doc;
	});
};
