import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface TokenListState {
	tokens: Map<string, unknown>;
}

export const tokenListState = proxy<TokenListState>({
	tokens: proxyMap(),
});
