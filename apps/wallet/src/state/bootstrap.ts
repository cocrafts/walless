import { getStateFromPath } from '@react-navigation/native';
import { logger, Networks, runtime } from '@walless/core';
import type {
	CollectionDocument,
	HistoryDocument,
	NetworkClustersDocument,
	NftDocument,
	PouchDocument,
	PublicKeyDocument,
	SettingDocument,
	TokenDocument,
	WidgetDocument,
} from '@walless/store';
import {
	configure,
	getLatestMigrationVersion,
	migrateDatabase,
	selectors,
} from '@walless/store';
import { createEngine, engine, setEngine } from 'engine';
import {
	createAptosRunner,
	createSolanaRunner,
	createSuiRunner,
	createTezosRunner,
} from 'engine/runners';
import type { Engine } from 'engine/types';
import { configureDeviceAndNotification } from 'utils/device';
import { initializeAuth, loadRemoteConfig } from 'utils/firebase';
import {
	linking,
	navigationRef,
	ResetAnchors,
	resetRoute,
} from 'utils/navigation';
import { initializeVaultKeys, storage } from 'utils/storage';
import { appMigrations } from 'utils/storage/migrations';

import { appState } from './app';
import { collectionState, nftState, tokenState } from './assets';
import { historyState } from './history';
import { keyState } from './keys';
import { widgetState } from './widget';

export const bootstrap = async (): Promise<void> => {
	const startTime = new Date();
	appState.remoteConfig = loadRemoteConfig();

	await configure(storage);
	await migrateDatabase(storage, 'app', appMigrations).then(async () => {
		const latestMigration = getLatestMigrationVersion();
		await storage.upsert<SettingDocument>('settings', async (doc) => {
			doc.config = Object.assign({}, doc.config);
			doc.config.storageVersion = latestMigration;

			return doc;
		});
	});

	await Promise.all([
		configEngine(),
		initializeAuth(),
		watchStorageAndSyncState(),
	]);

	configureDeviceAndNotification();

	const milliseconds = new Date().getTime() - startTime.getTime();
	logger.debug(`Started up in ${milliseconds}ms`);
};

export const launchApp = async (): Promise<void> => {
	const settings = await storage.safeGet<SettingDocument>('settings');

	const isSignedIn = settings?.profile?.id;
	if (isSignedIn) {
		const initialLinkingURL = appState.initialLinkingURL;
		if (initialLinkingURL) {
			const route = getStateFromPath(initialLinkingURL, linking.config);
			if (!route) return;
			navigationRef.reset({ index: 0, routes: route.routes });
		} else {
			const widgetId = settings?.config?.latestLocation;
			resetRoute(ResetAnchors.Widget, { id: widgetId || 'explorer' });
		}
	} else {
		resetRoute(ResetAnchors.Invitation);
	}
};

export const initAfterSignIn = async () => {
	if (!runtime.isMobile) {
		await initializeVaultKeys();
	}

	// clean registered engine before restart
	if (engine) await engine.clear();

	await registerNetworkRunners(engine);
	await engine.start();
};

const configEngine = async () => {
	if (engine) return;
	const newEngine = await createEngine();
	await registerNetworkRunners(newEngine);
	await newEngine.start();
	setEngine(newEngine);
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
				nftState.map.delete(id);
			} else if (item?.type === 'Collection') {
				collectionState.map.delete(id);
			} else if (item?.type === 'History') {
				historyState.map.delete(id);
			}
		} else {
			if (item?.type === 'Widget') {
				widgetState.map.set(id, item as WidgetDocument);
			} else if (item?.type === 'PublicKey') {
				keyState.map.set(id, item as PublicKeyDocument);
			} else if (item?.type === 'Token') {
				tokenState.map.set(id, item as TokenDocument);
			} else if (item?.type === 'NFT') {
				nftState.map.set(id, item as NftDocument);
			} else if (item?.type === 'Collection') {
				collectionState.map.set(id, item as CollectionDocument);
			} else if (item?.type === 'Setting') {
				const settings = item as SettingDocument;
				appState.profile = settings.profile;
				appState.config = settings.config;
			} else if (item?.type === 'ClusterMap') {
				appState.networkClusters = item as NetworkClustersDocument;
			} else if (item?.type === 'History') {
				historyState.map.set(id, item as HistoryDocument);
			}
		}
	});
};
