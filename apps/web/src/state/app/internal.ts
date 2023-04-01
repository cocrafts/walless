import { UserProfile } from '@walless/storage';
import { proxy } from 'valtio';

export interface AppState {
	passcodeLoading: boolean;
	passcodeError?: string;
	authenticationLoading: boolean;
	profileReady: boolean;
	profileLoading: boolean;
	profile: UserProfile;
}

export const appState = proxy<AppState>({
	profileReady: false,
	profileLoading: true,
	profile: {},
	passcodeLoading: false,
	authenticationLoading: false,
});
