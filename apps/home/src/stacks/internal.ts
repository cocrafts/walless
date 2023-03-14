import {
	createNavigationContainerRef,
	LinkingOptions,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export type RootParamList = {
	AuthResponse: undefined;
	Home: undefined;
};

export const screenOptions: StackNavigationOptions = {
	headerShown: false,
	animationEnabled: false,
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['walless://', 'https://walless.io'],
	config: {
		screens: {
			AuthResponse: '/w3a-response',
			Home: '/',
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
