import type { WidgetDocument } from '@walless/store';

import { storage } from './db';

const addWidgetToStorage = async (id: string, widget: WidgetDocument) => {
	await storage.upsert<WidgetDocument>(id, async () => widget);
};

export { addWidgetToStorage };
