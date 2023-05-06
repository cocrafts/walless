import { tokenListState } from '@walless/app';
import { type TokenDocument } from '@walless/store';

export const tokenListActions = {
	set: (tokens: TokenDocument[]) => {
		tokenListState.tokens = tokens;
	},
};
