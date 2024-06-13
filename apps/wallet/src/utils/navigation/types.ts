import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';

export type AuthenticationParamList = {
	Login: undefined;
	CreatePasscode: undefined;
	DeprecatedPasscode: undefined;
	Invitation: undefined;
	Recovery: undefined;
};

export type CollectionParamList = {
	Default: {
		id?: string;
	};
	NFT: {
		id: string;
	};
};

export type ProfileParamList = {
	Default: undefined;
	Setting: undefined;
	History: undefined;
};

export type ExploreParamList = {
	Widget: { id: string };
	Collection: NavigatorScreenParams<CollectionParamList>;
	Profile: NavigatorScreenParams<ProfileParamList>;
	Loyalty: undefined;
};

export type HomeParamList = {
	Default: undefined;
	History: undefined;
};

export type BrowserParamList = {
	uri?: string;
};

export type SettingParamList = {
	Default: undefined;
	Referral: undefined;
};

export type DashboardParamList = {
	Explore: NavigatorScreenParams<ExploreParamList>;
	Home: NavigatorScreenParams<HomeParamList>;
	Browser: NavigatorScreenParams<BrowserParamList>;
	Setting: NavigatorScreenParams<SettingParamList>;
};

export type RequestsParamList = {
	RequestConnect: { requestId: string };
	RequestSignature: { requestId: string };
	RequestInstallLayout: { requestId: string };
};

export type RootParamList = {
	Splash: undefined;
	Authentication: NavigatorScreenParams<AuthenticationParamList>;
	Dashboard: NavigatorScreenParams<DashboardParamList>;
	Requests: NavigatorScreenParams<RequestsParamList>;
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
