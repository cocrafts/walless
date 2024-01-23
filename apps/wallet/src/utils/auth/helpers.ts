import type { Config, UserProfile } from '@walless/core';
import type { WalletInvitation } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { SettingDocument } from '@walless/store';
import type { FirebaseUser } from 'utils/firebase';
import { qlClient } from 'utils/graphql';
import { storage } from 'utils/storage';

export interface BootstrapResult {
	profile?: UserProfile;
	config?: Config;
}

export const makeProfile = (user: FirebaseUser): UserProfile => {
	return {
		id: user.uid,
		email: user.email as never,
		name: user.displayName as never,
		profileImage: user.photoURL as never,
	};
};

export const setProfile = async (profile: UserProfile) => {
	await storage.upsert<SettingDocument>('settings', async (doc) => {
		doc.type = doc.type || 'Setting';
		doc.profile = profile;
		doc.config = doc.config || {
			version: '1.0.0',
			hideBalance: true,
			latestLocation: '/',
		};

		return doc;
	});
};

export const validateInvitationCode = async (code: string): Promise<string> => {
	const { walletInvitation } = await qlClient.request<{
		walletInvitation: WalletInvitation;
	}>(queries.walletInvitation, { code });

	if (!walletInvitation) {
		throw Error('This invitation code is invalid!');
	} else if (walletInvitation?.email) {
		throw Error('This invitation code is used by another account!');
	} else {
		return code;
	}
};
