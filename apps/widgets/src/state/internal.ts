import type { Widget } from '@walless/graphql';
import { proxy } from 'valtio';

export interface AppState {
	widgetStore: {
		widgets: Widget[];
	};
	auth: {
		profile: {
			pubkey: string;
		};
		accessToken: string;
	};
}

export const appState = proxy<AppState>({
	widgetStore: {
		widgets: [],
	},
	auth: {
		profile: {
			pubkey: '',
		},
		accessToken: '',
	},
});
