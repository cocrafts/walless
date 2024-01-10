import type { BootstrapResult } from '@walless/auth';
import { modules } from '@walless/ioc';
import type {
	CollectibleDocument,
	CollectionDocument,
	EndpointsDocument,
	PouchDocument,
	PublicKeyDocument,
	SettingDocument,
	TokenDocument,
	WidgetDocument,
} from '@walless/store';
import { loadRemoteConfig } from 'utils/firebase';
import { ResetAnchors, resetRoute } from 'utils/navigation';

import { appState } from './app';
import { collectibleState, collectionState, tokenState } from './assets';
import { keyState } from './keys';
import { widgetState } from './widget';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = loadRemoteConfig();
	await watchAndSync();

	return appState;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const launchApp = async (config: BootstrapResult): Promise<void> => {
	const settings = await modules.storage.safeGet<SettingDocument>('settings');
	const widgetId = settings?.config?.latestLocation as string;

	if (settings?.profile?.id) {
		resetRoute(ResetAnchors.Widget, { id: widgetId || 'explorer' });
	} else {
		resetRoute(ResetAnchors.Invitation);
	}
};

export const watchAndSync = async () => {
	const options = {
		live: true,
		include_docs: true,
	};

	modules.storage.changes(options).on('change', ({ id, doc, deleted }) => {
		const item = doc as PouchDocument<object>;
		if (deleted) {
			if (item?.type === 'Widget') {
				widgetState.map.delete(id);
			} else if (item?.type === 'PublicKey') {
				keyState.map.delete(id);
			} else if (item?.type === 'Token') {
				tokenState.map.delete(id);
			} else if (item?.type === 'NFT') {
				collectibleState.map.delete(id);
			} else if (item?.type === 'Collection') {
				collectionState.map.delete(id);
			}
		} else {
			if (item?.type === 'Widget') {
				widgetState.map.set(id, item as WidgetDocument);
			} else if (item?.type === 'PublicKey') {
				keyState.map.set(id, item as PublicKeyDocument);
			} else if (item?.type === 'Token') {
				tokenState.map.set(id, item as TokenDocument);
			} else if (item?.type === 'NFT') {
				collectibleState.map.set(id, item as CollectibleDocument);
			} else if (item?.type === 'Collection') {
				collectionState.map.set(id, item as CollectionDocument);
			} else if (item?.type === 'Setting') {
				const settings = item as SettingDocument;
				appState.profile = settings.profile;
				appState.config = settings.config;
			} else if (item?.type === 'EndpointMap') {
				appState.endpoints = item as EndpointsDocument;
			}
		}
	});
};
