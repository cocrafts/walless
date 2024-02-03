import { logger } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import type { SwapQuote } from './types';

export const getMappedMint = (token: TokenDocument) => {
	if (token.account.mint === '11111111111111111111111111111111') {
		return 'So11111111111111111111111111111111111111112';
	} else if (
		token.account.mint === 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'
	) {
		return 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
	}

	return token.account.mint;
};

export const getSwapQuote = async (
	fromMint: string,
	toMint: string,
	amount: number,
	slippageBps: number = 50,
): Promise<SwapQuote | undefined> => {
	const res = await fetch(
		`https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amount}&slippageBps=${slippageBps}`,
	);

	const data = await res.json();
	if (res.ok) {
		return data as SwapQuote;
	}

	logger.error('fetch swap quote error:', data);
};
