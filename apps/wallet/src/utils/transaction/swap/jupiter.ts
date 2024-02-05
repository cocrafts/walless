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

type GetSwapParams = {
	fromMint: string;
	toMint: string;
	amount: number;
	slippageBps?: number;
};

export const getSwapQuote = async ({
	fromMint,
	toMint,
	amount,
	slippageBps = 50,
}: GetSwapParams): Promise<SwapQuote | undefined> => {
	const res = await fetch(
		`https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amount}&slippageBps=${slippageBps}`,
	);

	const data = await res.json();
	if (res.ok) {
		return data as SwapQuote;
	}

	logger.error('fetch swap quote error:', data);
};

type SwapParams = {
	fromMint: string;
	toMint: string;
	amount: number;
	slippageBps?: number;
	userPublicKey: string;
	wrapAndUnwrapSol: boolean;
};
export const swap = async ({
	fromMint,
	toMint,
	amount,
	slippageBps,
	userPublicKey,
	wrapAndUnwrapSol,
}: SwapParams) => {
	const quoteResponse = await getSwapQuote({
		fromMint,
		toMint,
		amount,
		slippageBps,
	});
	if (!quoteResponse) {
		throw Error('Can not fetch swap quote, please try again!');
	}

	const res = await fetch('https://quote-api.jup.ag/v6/swap', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			// quoteResponse from /quote api
			quoteResponse,
			// user public key to be used for the swap
			userPublicKey,
			// auto wrap and unwrap SOL. default is true
			wrapAndUnwrapSol,
			// feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
			// feeAccount: "fee_account_public_key"
		}),
	});
	if (!res.ok) {
		throw Error('Something went wrong, can not swap!');
	}

	const { swapTransaction } = await res.json();
	console.log('Tx', swapTransaction);
};
