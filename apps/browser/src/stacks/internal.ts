import {
	createNavigationContainerRef,
	LinkingOptions,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export type RootParamList = {
	Login: undefined;
	AuthResponse: undefined;
	Dashboard: undefined;
};

export const screenOptions: StackNavigationOptions = {
	headerShown: false,
	animationEnabled: false,
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['walless://', 'https://app.walless.io'],
	config: {
		screens: {
			Login: '/login',
			AuthResponse: '/w3a-response',
			Dashboard: '/',
		},
	},
};

export const navigationRef = createNavigationContainerRef<RootParamList>();

export const navigate = (
	name: keyof RootParamList,
	params: RootParamList[keyof RootParamList],
) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
};
