import { type TokenDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface TokenState {
	map: Map<string, TokenDocument>;
}

export const tokenState = proxy<TokenState>({
	map: proxyMap(),
});
