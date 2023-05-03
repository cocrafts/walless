import { type TorusLoginResponse } from '@toruslabs/customauth';
import { UserProfile } from '@walless/core';

export const makeProfile = ({
	publicAddress,
	userInfo,
}: TorusLoginResponse): UserProfile => {
	return {
		id: publicAddress,
		email: userInfo.email,
		name: userInfo.name,
		profileImage: userInfo.profileImage,
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
