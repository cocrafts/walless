import { Networks } from '@walless/core';
import {
	ExtensionDocument,
	PouchDocument,
	PublicKeyDocument,
} from '@walless/store';
import { db } from 'utils/pouch';

import { extensionActions, extensionState } from '../extension';
import { walletActions, walletState } from '../wallet';

export const initializeLiveState = async () => {
	const extensionResponse = await db.find({ selector: { type: 'Extension' } });
	const extensions = extensionResponse.docs as ExtensionDocument[];
	const publicKeyResponse = await db.find({ selector: { type: 'PublicKey' } });
	const publicKeys = publicKeyResponse.docs as PublicKeyDocument[];
	const suiKeys = publicKeys.filter((i) => i.network === Networks.sui);
	const solanaKeys = publicKeys.filter((i) => i.network === Networks.solana);

	extensionActions.setExtensions(extensions);
	walletActions.setSuiKeys(suiKeys);
	walletActions.setSolanaKeys(solanaKeys);

	const changes = db.changes({
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
				const key = item as PublicKeyDocument;

				if (key.network === Networks.sui) {
					walletState.suiKeyMap.delete(id);
				} else if (key.network === Networks.solana) {
					walletState.solanaKeyMap.delete(id);
				}
			}
		} else {
			if (item?.type === 'Extension') {
				extensionState.map.set(id, item as never);
			} else if (item?.type === 'PublicKey') {
				const key = item as PublicKeyDocument;

				if (key.network === Networks.sui) {
					walletState.suiKeyMap.set(id, key);
				} else if (key.network === Networks.solana) {
					walletState.solanaKeyMap.set(id, key);
				}
			}
		}
	});
};
