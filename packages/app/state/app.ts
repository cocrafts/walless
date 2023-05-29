import { type SettingConfig, type UserProfile } from '@walless/core';
import { proxy } from 'valtio';

export interface AppState {
	loading: boolean;
	passcodeLoading: boolean;
	passcodeError?: string;
	authenticationLoading: boolean;
	invitationError?: string;
	invitationCode?: string;
	isAbleToSignIn?: boolean;
	signInError?: string;
	profileReady: boolean;
	profileLoading: boolean;
	profile: UserProfile;
	settingConfig: SettingConfig;
}

export const appState = proxy<AppState>({
	loading: true,
	profileReady: false,
	profileLoading: true,
	profile: {},
	passcodeLoading: false,
	authenticationLoading: false,
	settingConfig: {
		hideBalance: true,
	},
});
