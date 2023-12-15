import type {
	LinkingOptions,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import type { MobileNavigation } from '@walless/core';

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
	Authentication: NavigatorScreenParams<AuthenticationParamList>;
	Dashboard: NavigatorScreenParams<DashboardParamList>;
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['walless://'],
	config: {
		screens: {
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
					Setting: '/setting',
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

export const resetRoute = (
	anchor?: ResetAnchors,
	params?: object,
	route?: MobileNavigation,
) => {
	if (!anchor && route) {
		navigationRef.reset({ index: 0, routes: [route] });
	} else if (anchor === 'Dashboard') {
		navigationRef.reset({ index: 0, routes: [dashboardRoute()] });
	} else if (anchor === 'Invitation') {
		navigationRef.reset({ index: 0, routes: [authenticationRoute(params)] });
	} else if (anchor === 'CreatePasscode') {
		navigationRef.reset({ index: 0, routes: [createPasscodeRoute()] });
	} else if (anchor === 'Recovery') {
		navigationRef.reset({ index: 0, routes: [recoveryRoute()] });
	}
};

type ResetAnchors = 'Dashboard' | 'Invitation' | 'CreatePasscode' | 'Recovery';

const dashboardRoute = () => ({
	name: 'Dashboard',
	params: {
		screen: 'Explore',
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
