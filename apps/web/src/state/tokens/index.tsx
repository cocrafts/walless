import { tokenListState } from '@walless/app';
import { type TokenDocument } from '@walless/store';

export const tokenListActions = {
	set: (tokens: TokenDocument[]) => {
		tokenListState.tokens.clear();
		for (const token of tokens) tokenListState.tokens.set(token._id, token);
	},
};

export { tokenListState } from '@walless/app';
