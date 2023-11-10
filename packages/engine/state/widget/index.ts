import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';

import { widgetState } from './internal';

export const widgetActions = {
	setItems: (widgets: WidgetDocument[]) => {
		for (const widget of widgets) {
			widgetState.map.set(widget?._id, widget);
		}
	},
	checkInstalled: async (id: string) => {
		return (await modules.storage.safeGet<WidgetDocument>(id))?._id;
	},
	addWidget: async (widget: WidgetDocument) => {
		await modules.storage.put<WidgetDocument>(widget);
	},
	removeWidget: async (widget: WidgetDocument) => {
		await modules.storage.put<WidgetDocument>({
			...widget,
			_deleted: true,
		});
	},
};

export * from './internal';
export * from './shared';
