import type { Widget } from '@walless/graphql';
import { mutations, queries } from '@walless/graphql';
import { qlClient } from 'utils/graphql';

import { appState } from './internal';

export const widgetAction = {
	fetchWidgets: async () => {
		if (!appState.auth.authenticated) {
			appState.widgetStore.widgets = [];
			return;
		}

		try {
			const data = await qlClient.request<{ widgets: Widget[] }>(
				queries.allWidgets,
			);
			appState.widgetStore.widgets = data.widgets;
		} catch (error) {
			console.error(error);
		}
	},

	updateWidgetStatus: async (id: number, status: Widget['status']) => {
		try {
			const data = await qlClient.request<{ updateWidgetStatus: boolean }>(
				mutations.updateWidgetStatus,
				{ id, status },
			);
			if (data.updateWidgetStatus) {
				appState.widgetStore.widgets = appState.widgetStore.widgets.map(
					(widget) => (widget.id === id ? { ...widget, status } : widget),
				);
			}
		} catch (error) {
			console.error(error);
		}
	},
};

export const authAction = {
	handleSignIn: async (pubkey: string, signedMessage: Uint8Array) => {
		console.log('--> handleSignIn', { pubkey, signedMessage });
		appState.auth.authenticated = true;
	},
	handleSignOut: async () => {
		appState.auth.authenticated = false;
	},
};

export * from './internal';
