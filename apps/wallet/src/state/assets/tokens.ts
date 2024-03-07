import type { TokenDocumentV2 } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

export interface TokenState {
	map: Map<string, TokenDocumentV2>;
}

export const tokenState = proxy<TokenState>({
	map: proxyMap(),
});
