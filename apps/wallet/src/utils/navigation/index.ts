import { Linking } from 'react-native';
import type {
	LinkingOptions,
	NavigationState,
	PartialRoute,
	Route,
} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { logger } from '@walless/core';

import type { RootParamList, ScreenOptions } from './types';
import { ResetAnchors } from './types';

export * from './types';

export const handleLinkingRequest = (url: string, isInitialURL?: boolean) => {
	const { href } = new URL(url);
	logger.info(href, isInitialURL, 'TODO: handle incoming url');
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['walless://', 'https://walless.io', 'https://*.walless.io'],
	getInitialURL: async () => {
		const initialURL = await Linking.getInitialURL();
		if (initialURL) handleLinkingRequest(initialURL, true);

		return initialURL;
	},
	subscribe: () => {
		const subscription = Linking.addEventListener('url', ({ url }) => {
			handleLinkingRequest(url);
		});

		return () => subscription.remove();
	},
	config: {
		screens: {
			Splash: '/splash',
			Authentication: {
				path: '/auth',
				screens: {
					Login: '/',
					Invitation: '/invitation',
					Recovery: '/recovery',
					CreatePasscode: '/create-passcode',
					DeprecatedPasscode: '/deprecated-passcode',
				},
			},
			Dashboard: {
				screens: {
					Explore: {
						path: '/',
						screens: {
							Widget: '/widget/:id',
							Collection: {
								path: '/',
								screens: {
									Default: '/collection/:id',
									Collectible: '/collectible/:id',
								},
							},
							Profile: {
								path: '/profile',
								screens: {
									Default: '/',
									Setting: '/setting',
									History: '/history',
								},
							},
						},
					},
					Home: {
						path: '/home',
						screens: {
							Default: '/',
							History: '/history',
						},
					},
					Browser: '/browser/:uri',
					Setting: {
						path: '/setting',
						screens: {
							Default: '/',
						},
					},
				},
			},
		},
	},
};

export const screenOptions: ScreenOptions = {
	navigator: {
		headerShown: false,
		animationEnabled: true,
	},
	slide: {
		cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
	},
	fade: {
		cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
	},
	bottomFade: {
		cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
	},
	bottomReveal: {
		cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
	},
};

export const navigationRef = createNavigationContainerRef<RootParamList>();

export const navigate = (
	name: keyof RootParamList,
	params?: RootParamList[keyof RootParamList],
	reset = false,
) => {
	if (navigationRef.isReady()) {
		if (reset) {
			navigationRef.reset({ routes: [{ name }] });
		} else {
			navigationRef.navigate(name, params as never);
		}
	}
};

export const navigateBack = () => {
	if (navigationRef.canGoBack()) navigationRef.goBack();
};

export const resetRoute = (anchor?: ResetAnchors, params?: object) => {
	navigationRef.reset({ index: 0, routes: [getResetRoute(anchor, params)] });
};

const getResetRoute = (
	anchor?: ResetAnchors,
	params?: object,
): PartialRoute<Route<NavigationState['routeNames'][number]>> => {
	switch (anchor) {
		case ResetAnchors.Invitation:
			return {
				name: 'Authentication',
				params: {
					screen: 'Invitation',
					params,
				},
			};
		case ResetAnchors.CreatePasscode:
			return {
				name: 'Authentication',
				params: {
					screen: 'CreatePasscode',
					params,
				},
			};
		case ResetAnchors.Recovery:
			return {
				name: 'Authentication',
				params: {
					screen: 'Recovery',
					params,
				},
			};
		case ResetAnchors.Widget:
			return {
				name: 'Dashboard',
				params: {
					screen: 'Explore',
					params: {
						screen: 'Widget',
						params,
					},
				},
			};
		default:
			return {
				name: 'Splash',
			};
	}
};
