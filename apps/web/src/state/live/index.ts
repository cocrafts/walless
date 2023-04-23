import { Networks } from '@walless/core';
import {
	ExtensionDocument,
	PouchDocument,
	PublicKeyDocument,
	TokenDocument,
} from '@walless/store';
import { tokenActions, tokenState } from 'state/tokens';
import { db, selectors } from 'utils/pouch';

import { extensionActions, extensionState } from '../extension';
import { walletActions, walletState } from '../wallet';

export const initializeLiveState = async () => {
	const extensionResponse = await db.find(selectors.allExtensions);
	const extensions = extensionResponse.docs as ExtensionDocument[];
	const publicKeyResponse = await db.find(selectors.allKeys);
	const publicKeys = publicKeyResponse.docs as PublicKeyDocument[];
	const suiKeys = publicKeys.filter((i) => i.network === Networks.sui);
	const solanaKeys = publicKeys.filter((i) => i.network === Networks.solana);
	const tokenResponse = await db.find(selectors.allTokens);
	const allTokens = tokenResponse.docs as TokenDocument[];
	const suiTokens = allTokens.filter((i) => i.network === Networks.sui);
	const solanaTokens = allTokens.filter((i) => i.network === Networks.solana);

	extensionActions.setExtensions(extensions);
	walletActions.setSuiKeys(suiKeys);
	walletActions.setSolanaKeys(solanaKeys);
	tokenActions.setSuiTokens(suiTokens);
	tokenActions.setSolanaTokens(solanaTokens);

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
			} else if (item?.type === 'Token') {
				const token = item as TokenDocument;

				if (token.network === Networks.sui) {
					tokenState.suiTokenMap.delete(id);
				} else if (token.network === Networks.solana) {
					tokenState.solanaTokenMap.delete(id);
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
			} else {
				const token = item as TokenDocument;

				if (token.network === Networks.sui) {
					tokenState.suiTokenMap.set(id, token);
				} else if (token.network === Networks.solana) {
					tokenState.solanaTokenMap.set(id, token);
				}
			}
		}
	});
};
