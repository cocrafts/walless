import type {
	Config,
	NetworkClusterMap,
	RemoteConfig,
	UserProfile,
} from '@walless/core';
import { runtime } from '@walless/core';
import { dimensionState } from '@walless/gui';
import { defaultNetworkClusters } from 'engine/utils';
import { defaultConfig, defaultRemoteConfig } from 'utils/constants';
import { proxy, subscribe } from 'valtio';

import packageJSON from '../../package.json';

import { bootstrap, initAfterSignIn, launchApp } from './bootstrap';

export interface AppState {
	config: Config;
	invitationCode?: string;
	profile: UserProfile;
	remoteConfig: RemoteConfig;
	networkClusters: NetworkClusterMap;
	jwtAuth?: string;
	navigationDisplay: {
		isNavigationHeaderActive: boolean;
		isPermanentDrawer: boolean;
		isBottomTabActive: boolean;
		isSidebarAvatarActive: boolean;
	};
	isMobileDisplay: boolean;
	initialLinkingURL?: string;
}

export const appState = proxy<AppState>({
	config: { ...defaultConfig, version: packageJSON.version },
	profile: {},
	remoteConfig: defaultRemoteConfig,
	networkClusters: defaultNetworkClusters,
	navigationDisplay: {
		isNavigationHeaderActive: false,
		isPermanentDrawer: false,
		isBottomTabActive: false,
		isSidebarAvatarActive: false,
	},
	isMobileDisplay: false,
});

export const appActions = {
	bootstrap,
	launchApp,
	initAfterSignIn,
	cleanupAfterLogOut: () => {
		appState.profile = {};
		appState.jwtAuth = undefined;
	},
};

const controlNavigationDisplay = () => {
	const { width } = dimensionState.windowSize;
	const isResponsiveWidth = width <= 420;

	const isMobileLayout =
		!runtime.isExtension && (isResponsiveWidth || runtime.isMobile);
	appState.isMobileDisplay = isMobileLayout;

	if (isMobileLayout) {
		appState.navigationDisplay = {
			isNavigationHeaderActive: true,
			isPermanentDrawer: false,
			isBottomTabActive: true,
			isSidebarAvatarActive: false,
		};
	} else {
		appState.navigationDisplay = {
			isNavigationHeaderActive: false,
			isPermanentDrawer: true,
			isBottomTabActive: false,
			isSidebarAvatarActive: true,
		};
	}
};

controlNavigationDisplay();
subscribe(dimensionState, controlNavigationDisplay);
