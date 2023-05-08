import { proxy } from 'valtio';

export interface TokenListState {
	tokens: unknown;
}

export const tokenListState = proxy<TokenListState>({
	tokens: [],
});
