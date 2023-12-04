import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { navigationRef } from 'utils/navigation';

export const useStoreLastScreen = () => {
	const { index, routes } = navigationRef.getRootState();
	const { name, params } = routes[index];
	modules.storage.upsert<SettingDocument>('settings', async (doc) => {
		doc.config.mobileLastestLocation = { name, params };
		return doc;
	});
};
