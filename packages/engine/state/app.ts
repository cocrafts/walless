import type {
	Config,
	EndpointMap,
	RemoteConfig,
	UserProfile,
} from '@walless/core';
import { proxy } from 'valtio';

import { defaultEndpoints } from '../utils/crawler';

export interface AppState {
	version: string;
	invitationCode?: string;
	profile: UserProfile;
	config: Config;
	remoteConfig: RemoteConfig;
	endpoints: EndpointMap;
	jwtAuth?: string;
}

export const defaultConfig: Config = {
	hideBalance: true,
	latestLocation: '/',
};

export const defaultRemoteConfig: RemoteConfig = {
	experimentalEnabled: true,
	deepAnalyticsEnabled: true,
	minimalVersion: '1.0.0',
};

export const appState = proxy<AppState>({
	version: '1.0.0',
	profile: {},
	config: defaultConfig,
	remoteConfig: defaultRemoteConfig,
	endpoints: defaultEndpoints,
});
