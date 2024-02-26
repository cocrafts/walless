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
		navigationHeaderActive: boolean;
		drawerPermanent: boolean;
		bottomTabActive: boolean;
		sidebarAvatarActive: boolean;
	};
	isMobileDisplay: boolean;
}

export const appState = proxy<AppState>({
	version: '1.0.0',
	profile: {},
	config: defaultConfig,
	remoteConfig: defaultRemoteConfig,
	endpoints: defaultEndpoints,
	navigationDisplay: {
		navigationHeaderActive: false,
		drawerPermanent: false,
		bottomTabActive: false,
		sidebarAvatarActive: false,
	},
	isMobileDisplay: false,
});

export const appActions = {
	bootstrap,
	launchApp,
	initAfterSignIn,
};

export const controlNavigationDisplay = () => {
	const { width } = dimensionState.windowSize;
	const isResponsiveWidth = width <= 420;

	const isMobileLayout =
		!runtime.isExtension && (isResponsiveWidth || runtime.isMobile);
	appState.isMobileDisplay = isMobileLayout;

	if (isMobileLayout) {
		appState.navigationDisplay = {
			navigationHeaderActive: true,
			drawerPermanent: false,
			bottomTabActive: true,
			sidebarAvatarActive: false,
		};
	} else {
		appState.navigationDisplay = {
			navigationHeaderActive: false,
			drawerPermanent: true,
			bottomTabActive: false,
			sidebarAvatarActive: true,
		};
	}
};

subscribe(dimensionState, controlNavigationDisplay);
