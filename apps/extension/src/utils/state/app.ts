import { proxy } from 'valtio';

export interface AppState {
	loading: boolean;
}

export const appState = proxy<AppState>({
	loading: true,
});

export const appActions = {
	setLoading: (flag: boolean): void => {
		appState.loading = flag;
	},
};
