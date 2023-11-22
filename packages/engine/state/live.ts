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
import { selectors as f } from '@walless/store';

import { appState } from './app';
import {
	collectibleActions,
	collectibleState,
	collectionState,
} from './collectible';
import { keyActions, keyState } from './key';
import { tokenActions, tokenState } from './token';
import { widgetActions, widgetState } from './widget';

const initialize = async () => {
	const { storage } = modules;
	const widget = await storage.find<WidgetDocument>(f.allWidgets);
	const allKey = await storage.find<PublicKeyDocument>(f.allKeys);
	const allToken = await storage.find<TokenDocument>(f.allTokens);
	const allCollectibles = await storage.find<CollectibleDocument>(
		f.allCollectibles,
	);
	const allCollections = await storage.find<CollectionDocument>(
		f.allCollections,
	);
	const setting = await storage.safeGet<SettingDocument>('settings');
	const endpoint = await storage.safeGet<EndpointsDocument>('endpoints');

	widgetActions.setItems(widget.docs);
	keyActions.setItems(allKey.docs);
	tokenActions.setItems(allToken.docs);
	collectibleActions.setCollectibles(allCollectibles.docs);
	collectibleActions.setCollections(allCollections.docs);

	if (setting) {
		appState.config = setting.config;
		appState.profile = setting.profile;
	}

	if (endpoint) {
		appState.endpoints = endpoint;
	}
};

export const watchAndSync = async () => {
	const options = {
		since: 'now',
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
				widgetState.map.set(id, item as never);
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

export const liveActions = {
	initialize,
	watchAndSync,
};
