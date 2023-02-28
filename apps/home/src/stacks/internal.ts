import {
	createNavigationContainerRef,
	LinkingOptions,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export type RootParamList = {
	Authentication: undefined;
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
			Authentication: '/auth',
			Home: '/',
		},
	},
};

export const navigationRef = createNavigationContainerRef<RootParamList>();

const navigate = (
	name: keyof RootParamList,
	params: RootParamList[keyof RootParamList],
) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
};

console.log(navigate);
