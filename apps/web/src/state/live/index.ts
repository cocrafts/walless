import {
	tokenActions,
	tokenState,
	walletActions,
	walletState,
} from '@walless/engine';
import { modules } from '@walless/ioc';
import {
	type ExtensionDocument,
	type PouchDocument,
	type PublicKeyDocument,
	type SettingDocument,
	type TokenDocument,
	selectors,
} from '@walless/store';
import { settingsActions } from 'state/settings';

import { extensionActions, extensionState } from '../extension';

export const initializeLiveState = async () => {
	const extensionResponse = await modules.storage.find(selectors.allExtensions);
	const extensions = extensionResponse.docs as ExtensionDocument[];
	const publicKeyResponse = await modules.storage.find(selectors.allKeys);
	const publicKeys = publicKeyResponse.docs as PublicKeyDocument[];
	const tokenResponse = await modules.storage.find(selectors.allTokens);
	const tokens = tokenResponse.docs as TokenDocument[];
	const settings = (await modules.storage.safeGet(
		'settings',
	)) as SettingDocument;

	extensionActions.setExtensions(extensions);
	walletActions.setItems(publicKeys);
	tokenActions.setItems(tokens);
	settingsActions.setConfigs(settings);

	const changes = modules.storage.changes({
		since: 'now',
		live: true,
		include_docs: true,
	});

	changes.on('change', ({ id, doc, deleted }) => {
		const item = doc as PouchDocument<object>;

		if (deleted) {
			if (item?.type === 'Extension') {
				extensionState.map.delete(id);
			} else if (item?.type === 'PublicKey') {
				walletState.map.delete(id);
			} else if (item?.type === 'Token') {
				tokenState.map.delete(id);
			}
		} else {
			if (item?.type === 'Extension') {
				extensionState.map.set(id, item as never);
			} else if (item?.type === 'PublicKey') {
				walletState.map.set(id, item as PublicKeyDocument);
			} else if (item?.type === 'Token') {
				tokenState.map.set(id, item as TokenDocument);
			} else if (item?.type === 'Setting') {
				settingsActions.setConfigs(item as SettingDocument);
			}
		}
	});
};
