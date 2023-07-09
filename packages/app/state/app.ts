import {
	type Config,
	type RemoteConfig,
	type UserProfile,
} from '@walless/core';
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
	config: Config;
	remoteConfig: RemoteConfig;
}

export const defaultConfig: Config = {
	hideBalance: true,
	latestLocation: '/',
};

export const defaultRemoteConfig: RemoteConfig = {
	experimentalEnabled: false,
};

export const appState = proxy<AppState>({
	loading: true,
	profileReady: false,
	profileLoading: true,
	profile: {},
	passcodeLoading: false,
	authenticationLoading: false,
	config: defaultConfig,
	remoteConfig: defaultRemoteConfig,
});
