import { type TokenAccount } from '@walless/core';
import numeral from 'numeral';

export const parseTokenAccount = (item: TokenAccount): number => {
	return parseFloat(item.balance) / 10 ** item.decimals;
};

export const formatQuote = (
	value: number | undefined,
	format = '0.00',
	suffix = ' USD',
	fallbackDisplay = '-',
) => {
	if (!value) return fallbackDisplay;
	return `${numeral(value).format(format)}${suffix}`;
};
