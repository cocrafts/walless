import { type UserProfile } from '@walless/core';
import { proxy } from 'valtio';

export interface AppState {
	loading: boolean;
	passcodeLoading: boolean;
	passcodeError?: string;
	authenticationLoading: boolean;
	profileReady: boolean;
	profile: UserProfile;
}

export const appState = proxy<AppState>({
	loading: true,
	passcodeLoading: false,
	authenticationLoading: false,
	profileReady: false,
	profile: {},
});
