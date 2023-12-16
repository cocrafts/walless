import { Linking } from 'react-native';
import type {
	LinkingOptions,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import type { MobileNavigation } from '@walless/core';
import { runtime } from '@walless/core';

export const handleUniversalLinkingRequest = (
	url: string,
	isInitialURL?: boolean,
) => {
	const { href } = new URL(url);
	console.log(href, isInitialURL, 'TODO: handle incoming url universally');
};

export const checkBrowserInitialURL = () => {
	if (runtime.isBrowser) {
		const { pathname, hash } = new URL(window.location.href);

		if (pathname !== '/' || hash !== '') {
			handleUniversalLinkingRequest(window.location.href);
		}

		setTimeout(() => {
			window.history.pushState('home', 'Walless', '/splash');
		}, 0);
	}
};

export type AuthenticationParamList = {
	Login: undefined;
	CreatePasscode: undefined;
	DeprecatedPasscode: undefined;
	Invitation: undefined;
	Recovery: undefined;
};

export type ExploreParamList = {
	Widget: {
		id?: string;
	};
	Collection: {
		id: string;
	};
	Collectible: {
		id: string;
	};
};

export type HomeParamList = {
	Default: undefined;
	History: undefined;
};

export type SettingParamList = {
	Default: undefined;
};

export type DashboardParamList = {
	Explore: NavigatorScreenParams<ExploreParamList>;
	Home: NavigatorScreenParams<HomeParamList>;
	Setting: NavigatorScreenParams<SettingParamList>;
};

export type RootParamList = {
	Splash: undefined;
	Authentication: NavigatorScreenParams<AuthenticationParamList>;
	Dashboard: NavigatorScreenParams<DashboardParamList>;
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['walless://', 'https://walless.io', 'https://*.walless.io'],
	getInitialURL: async () => {
		const initialURL = await Linking.getInitialURL();
		if (initialURL) handleUniversalLinkingRequest(initialURL, true);

		return initialURL;
	},
	subscribe: () => {
		const subscription = Linking.addEventListener('url', ({ url }) => {
			handleUniversalLinkingRequest(url);
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
							Collection: '/collection/:id',
							Collectible: '/collectible/:id',
						},
					},
					Home: {
						path: '/home',
						screens: {
							Default: '/',
							History: '/history',
						},
					},
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

interface ScreenOptions {
	navigator: StackNavigationOptions;
	slide: StackNavigationOptions;
	fade: StackNavigationOptions;
	bottomFade: StackNavigationOptions;
	bottomReveal: StackNavigationOptions;
}

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

type ResetAnchors = 'Widget' | 'Invitation' | 'CreatePasscode' | 'Recovery';

export const resetRoute = (anchor?: ResetAnchors, params?: object) => {
	if (anchor === 'Widget') {
		navigationRef.reset({ index: 0, routes: [widgetRoute(params)] });
	} else if (anchor === 'Invitation') {
		navigationRef.reset({ index: 0, routes: [authenticationRoute(params)] });
	} else if (anchor === 'CreatePasscode') {
		navigationRef.reset({ index: 0, routes: [createPasscodeRoute()] });
	} else if (anchor === 'Recovery') {
		navigationRef.reset({ index: 0, routes: [recoveryRoute()] });
	}
};

const widgetRoute = (params?: object) => ({
	name: 'Dashboard',
	params: {
		screen: 'Explore',
		params: {
			screen: 'Widget',
			params,
		},
	},
});

const authenticationRoute = (params?: object) => ({
	name: 'Authentication',
	params: {
		screen: 'Invitation',
		params,
	},
});

const createPasscodeRoute = (params?: object) => ({
	name: 'Authentication',
	params: {
		screen: 'CreatePasscode',
		params,
	},
});

const recoveryRoute = (params?: object) => ({
	name: 'Authentication',
	params: {
		screen: 'Recovery',
		params,
	},
});
