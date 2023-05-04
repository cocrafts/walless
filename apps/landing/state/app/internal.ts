import { proxy } from 'valtio';

export interface AppState {
	counter: number;
}

export const appState = proxy<AppState>({
	counter: 0,
});
