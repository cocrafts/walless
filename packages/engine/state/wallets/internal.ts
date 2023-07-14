import type { PublicKeyDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface WalletState {
	map: Map<string, PublicKeyDocument>;
}

export const walletState = proxy<WalletState>({
	map: proxyMap(),
});
