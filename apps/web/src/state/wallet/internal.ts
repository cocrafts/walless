import { PublicKeyDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface WalletState {
	suiKeyMap: Map<string, PublicKeyDocument>;
	solanaKeyMap: Map<string, PublicKeyDocument>;
}

export const walletState = proxy<WalletState>({
	suiKeyMap: proxyMap(),
	solanaKeyMap: proxyMap(),
});
