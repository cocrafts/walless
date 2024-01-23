import { logger, Networks } from '@walless/core';
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
import { configure, selectors } from '@walless/store';
import {
	createEngine,
	engine as defaultEngine,
	setDefaultEngine,
} from 'engine';
import {
	createAptosRunner,
	createSolanaRunner,
	createSuiRunner,
	createTezosRunner,
} from 'engine/runners';
import type { Engine } from 'engine/types';
import { configureDeviceAndNotification } from 'utils/device/device';
import { initializeAuth, loadRemoteConfig } from 'utils/firebase';
import { ResetAnchors, resetRoute } from 'utils/navigation';
import { storage } from 'utils/storage';

import { appState } from './app';
import { collectibleState, collectionState, tokenState } from './assets';
import { keyState } from './keys';
import { widgetState } from './widget';

export const bootstrap = async (): Promise<void> => {
	const startTime = new Date();
	appState.remoteConfig = loadRemoteConfig();

	await Promise.all([
		configure(storage).then(configEngine),
		initializeAuth(),
		watchStorageAndSyncState(),
	]);

	configureDeviceAndNotification();

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.debug(`Started up in ${milliseconds}ms`);
};

export const launchApp = async (): Promise<void> => {
	const settings = await storage.safeGet<SettingDocument>('settings');
	const widgetId = settings?.config?.latestLocation;

	if (settings?.profile?.id) {
		resetRoute(ResetAnchors.Widget, { id: widgetId || 'explorer' });
	} else {
		resetRoute(ResetAnchors.Invitation);
	}
};

export const initAfterSignIn = async () => {
	await registerNetworkRunners(defaultEngine);
	await defaultEngine.start();
};

const configEngine = async () => {
	if (defaultEngine) return;
	const engine = await createEngine();
	await registerNetworkRunners(engine);
	await engine.start();
	setDefaultEngine(engine);
};

const registerNetworkRunners = async (engine: Engine) => {
	const runnersMap = {
		solana: createSolanaRunner,
		sui: createSuiRunner,
		tezos: createTezosRunner,
		aptos: createAptosRunner,
	};

	const keys = (await storage.find<PublicKeyDocument>(selectors.allKeys)).docs;
	Object.values(Networks).forEach((network) => {
		const isNetworkAvailable = !!keys.find((i) => i.network === network);
		if (!isNetworkAvailable) return;
		engine.register(network, runnersMap[network]);
	});
};

const watchStorageAndSyncState = async () => {
	const options = {
		live: true,
		include_docs: true,
	};

	storage.changes(options).on('change', ({ id, doc, deleted }) => {
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
