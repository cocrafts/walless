import { PublicKeyRecord } from '@walless/storage';
import { liveQuery } from 'dexie';
import { db } from 'utils/storage';
import { proxy } from 'valtio';

export interface WalletState {
	keys: PublicKeyRecord[];
}

export const walletState = proxy<WalletState>({
	keys: [],
});

export const initializeWalletState = async () => {
	const allKeysObservable = liveQuery(() => db.publicKeys.toArray());

	allKeysObservable.subscribe((keys) => {
		walletState.keys = keys;
	});
};
