import { TokenDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface TokenState {
	suiTokenMap: Map<string, TokenDocument>;
	solanaTokenMap: Map<string, TokenDocument>;
}

export const tokenState = proxy<TokenState>({
	suiTokenMap: proxyMap(),
	solanaTokenMap: proxyMap(),
});
