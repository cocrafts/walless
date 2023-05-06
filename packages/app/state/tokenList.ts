import { type TokenDocument } from '@walless/store';
import { proxy } from 'valtio';

export interface TokenListState {
	tokens: TokenDocument[];
}

export const tokenListState = proxy<TokenListState>({
	tokens: [],
});
