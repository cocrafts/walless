import type { TokenAccountV1 } from '@walless/core';
import numeral from 'numeral';

export const parseTokenAccountBalance = (item: TokenAccountV1): number => {
	return parseFloat(item.balance) / 10 ** item.decimals;
};

export const formatQuote = (
	value: number | undefined,
	fallbackDisplay: string | number = '-',
	format = '0.00',
	suffix = ' USD',
) => {
	if (!value) return fallbackDisplay;
	return `${numeral(value).format(format)}${suffix}`;
};

export const removeRedundantCharacters = (text: string) =>
	text.replaceAll('  ', '').replaceAll('\u0000', '').trim();

export const convertDateToReadable = (date: Date) =>
	date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

export const parseWithDecimals = (balance: string, decimals: number) => {
	return parseFloat(balance) / 10 ** decimals;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gqlErrorToMeaningfulMessage = (error: any) => {
	if (error?.response?.errors && Array.isArray(error.response.errors)) {
		const firstError = error.response.errors[0];
		if (firstError.message) {
			return firstError.message;
		}
	}

	return 'Cannot read gql error';
};
