import { type UserProfile } from '@walless/core';
import { proxy } from 'valtio';

export interface AppState {
	loading: boolean;
	passcodeLoading: boolean;
	passcodeError?: string;
	authenticationLoading: boolean;
	invitationError?: string;
	profileReady: boolean;
	profileLoading: boolean;
	profile: UserProfile;
}

export const appState = proxy<AppState>({
	loading: true,
	profileReady: false,
	profileLoading: true,
	profile: {},
	passcodeLoading: false,
	authenticationLoading: false,
});
