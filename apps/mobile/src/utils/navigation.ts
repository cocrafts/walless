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

export type ProfileParamList = {
	ProfileDashboard: undefined;
	Setting: undefined;
	History: undefined;
};

export type DashboardParamList = {
	Home: NavigatorScreenParams<HomeParamList>;
	Explore: undefined;
	Profile: NavigatorScreenParams<ProfileParamList>;
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
				screens: {
					Explore: '/explore',
					Profile: {
						path: '/profile',
						screens: {
							ProfileDashboard: '/',
							Setting: '/setting',
							History: '/history',
						},
					},
					Home: {
						path: '/',
						screens: {
							Widget: '/widget/:id',
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
) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params as never);
	}
};

export const resetRoute = (anchor: ResetAnchors, params?: object) => {
	if (anchor === 'Dashboard') {
		navigationRef.reset({ index: 0, routes: [dashboardRoute()] });
	} else if (anchor === 'Invitation') {
		navigationRef.reset({ index: 0, routes: [authenticationRoute(params)] });
	}
};

type ResetAnchors = 'Dashboard' | 'Invitation';

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
