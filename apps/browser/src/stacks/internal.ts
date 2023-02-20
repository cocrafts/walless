import {
	createNavigationContainerRef,
	LinkingOptions,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export type RootParamList = {
	Login: undefined;
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
			Dashboard: '/',
		},
	},
};

export const navigationRef = createNavigationContainerRef<RootParamList>();

const navivgate = (
	name: keyof RootParamList,
	params: RootParamList[keyof RootParamList],
) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
};
