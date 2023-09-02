import type { UnknownObject, UserProfile } from '@walless/core';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

export const makeProfile = ({ user }: { user: UnknownObject }): UserProfile => {
	return {
		id: user.uid,
		email: user.email as never,
		name: user.displayName as never,
		profileImage: user.photoURL as never,
	};
};

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
