import type { Widget } from '@walless/graphql';
import { proxy } from 'valtio';

export interface AppState {
	widgetStore: {
		widgets: Widget[];
	};
}

export const appState = proxy<AppState>({
	widgetStore: {
		widgets: [],
	},
});
