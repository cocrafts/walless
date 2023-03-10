import { UserProfile } from '@walless/storage';
import { proxy } from 'valtio';

export interface AppState {
	loading: boolean;
	authLoading: boolean;
	profileReady: boolean;
	profile: UserProfile;
}

export const appState = proxy<AppState>({
	loading: true,
	authLoading: false,
	profileReady: false,
	profile: {},
});
