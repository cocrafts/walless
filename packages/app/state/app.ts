import { type UserProfile } from '@walless/core';
import { ExtensionDocument } from '@walless/store';
import { proxy } from 'valtio';

export interface AppState {
	loading: boolean;
	passcodeLoading: boolean;
	passcodeError?: string;
	authenticationLoading: boolean;
	profileReady: boolean;
	profileLoading: boolean;
	profile: UserProfile;
	removeLayout: (item: ExtensionDocument) => void;
}

export const appState = proxy<AppState>({
	loading: true,
	profileReady: false,
	profileLoading: true,
	profile: {},
	passcodeLoading: false,
	authenticationLoading: false,
	removeLayout: () => {
		// will be set by app
	},
});
