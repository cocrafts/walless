import type {
	Config,
	EndpointMap,
	RemoteConfig,
	UserProfile,
} from '@walless/core';
import { proxy } from 'valtio';

import { defaultEndpoints } from '../utils/crawler';

export interface AppState {
	loading: boolean;
	passcodeLoading: boolean;
	authenticationLoading: boolean;
	invitationCode?: string;
	isAbleToSignIn?: boolean;
	signInError?: string;
	profileReady: boolean;
	profileLoading: boolean;
	profile: UserProfile;
	config: Config;
	remoteConfig: RemoteConfig;
	endpoints: EndpointMap;
	activeWidgetId: string;
	isDrawerOpen: boolean;
	jwtAuth?: string;
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
	endpoints: defaultEndpoints,
	activeWidgetId: '',
	isDrawerOpen: false,
});
