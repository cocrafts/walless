import type {
	Config,
	Endpoint,
	EndpointMap,
	RemoteConfig,
	UserProfile,
} from '@walless/core';
import { runtime } from '@walless/core';
import { dimensionState } from '@walless/gui';
import { defaultConfig, defaultRemoteConfig } from 'utils/constants';
import { proxy, subscribe } from 'valtio';

import { bootstrap, initAfterSignIn, launchApp } from './bootstrap';

const defaultEndpoint: Endpoint = __DEV__ ? 'devnet' : 'mainnet';

export const defaultEndpoints: EndpointMap = {
	solana: defaultEndpoint,
	sui: defaultEndpoint,
	tezos: defaultEndpoint,
	aptos: defaultEndpoint,
};

export interface AppState {
	version: string;
	invitationCode?: string;
	profile: UserProfile;
	config: Config;
	remoteConfig: RemoteConfig;
	endpoints: EndpointMap;
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
	version: '1.0.0',
	profile: {},
	config: defaultConfig,
	remoteConfig: defaultRemoteConfig,
	endpoints: defaultEndpoints,
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
