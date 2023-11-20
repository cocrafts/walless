import type { Config, UserProfile } from '@walless/core';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

export interface BootstrapResult {
	profile?: UserProfile;
	config?: Config;
}

export interface IFirebaseUser {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
}

export const makeProfile = (user: IFirebaseUser): UserProfile => {
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
		doc.profile = profile;
		doc.version = doc.version || '0.0.1';
		doc.config = doc.config || {
			hideBalance: true,
			latestLocation: '/',
		};

		return doc;
	});
};
