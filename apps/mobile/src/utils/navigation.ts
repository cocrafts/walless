import type {
	LinkingOptions,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

export type AuthenticationParamList = {
	Login: undefined;
	CreatePasscode: undefined;
	DeprecatedPasscode: undefined;
	Invitation: undefined;
	Recovery: undefined;
};

export type HomeParamList = {
	Widget: {
		id?: string;
	};
};

export type DashboardParamList = {
	OurProject: undefined;
	Explore: undefined;
	Profile: undefined;
};

export type RootParamList = {
	Splash: undefined;
	Authentication: NavigatorScreenParams<AuthenticationParamList>;
	Dashboard: NavigatorScreenParams<DashboardParamList>;
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['walless://'],
	config: {
		screens: {
			Splash: '/splash/:id',
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
				path: '/',
				screens: {
					Explore: '/explore',
					Profile: '/profile',
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
) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params as never);
	}
};

export const resetRoute = (anchor: ResetAnchors, params?: object) => {
	if (anchor === 'Widget') {
		navigationRef.reset({ index: 0, routes: [widgetRoute(params)] });
	} else if (anchor === 'Invitation') {
		navigationRef.reset({ index: 0, routes: [authenticationRoute(params)] });
	}
};

type ResetAnchors = 'Widget' | 'Invitation';

const widgetRoute = (params?: object) => ({
	name: 'Dashboard',
	params: {
		screen: 'Home',
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
