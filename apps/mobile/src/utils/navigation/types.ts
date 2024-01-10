import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';

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

export enum ResetAnchors {
	Widget = 'Widget',
	Invitation = 'Invitation',
	CreatePasscode = 'CreatePasscode',
	Recovery = 'Recovery',
}

export interface ScreenOptions {
	navigator: StackNavigationOptions;
	slide: StackNavigationOptions;
	fade: StackNavigationOptions;
	bottomFade: StackNavigationOptions;
	bottomReveal: StackNavigationOptions;
}
