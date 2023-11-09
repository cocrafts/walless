import { modules } from '@walless/ioc';

import type { WidgetDocument } from './type';

const addWidgetToStorage = async (id: string, widget: WidgetDocument) => {
	await modules.storage.upsert<WidgetDocument>(id, async () => widget);
};

export { addWidgetToStorage };
