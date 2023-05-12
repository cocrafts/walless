import { type TokenAccount } from '@walless/core';

export const formatTokenValue = (item: TokenAccount) => {
	return parseFloat(item.balance) / 10 ** item.decimals;
};
