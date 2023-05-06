import { UserProfile } from '@walless/core';
import { UserCredential } from 'firebase/auth';

export const makeProfile = ({ user }: UserCredential): UserProfile => {
	return {
		id: user.uid,
		email: user.email as never,
		name: user.displayName as never,
		profileImage: user.photoURL as never,
	};
};

export enum ThresholdResult {
	Initializing = 'initializing',
	Ready = 'ready',
	Missing = 'missing',
}

export interface BootstrapResult {
	profile?: UserProfile;
}
