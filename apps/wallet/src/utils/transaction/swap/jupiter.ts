import { VersionedTransaction } from '@solana/web3.js';
import type { SolanaToken } from '@walless/core';
import { logger } from '@walless/core';
import type { TokenDocumentV2 } from '@walless/store';
import { environment } from 'utils/config';
import { solMint } from 'utils/constants';

import type { SwapQuote } from './types';

export const getAliasedMint = (token: TokenDocumentV2<SolanaToken>) => {
	if (environment.NETWORK_CLUSTER === 'devnet') {
		if (token.mint === 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr') {
			return 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
		}
	}

	if (token.mint === solMint) {
		return 'So11111111111111111111111111111111111111112';
	}

	return token.mint;
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
		`${environment.JUPITER_API_ENDPOINT}/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amount}&slippageBps=${slippageBps}`,
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
export const constructSwapTransaction = async ({
	fromMint,
	toMint,
	amount,
	slippageBps,
	userPublicKey,
	wrapAndUnwrapSol,
}: SwapParams): Promise<VersionedTransaction> => {
	const quoteResponse = await getSwapQuote({
		fromMint,
		toMint,
		amount,
		slippageBps,
	});
	if (!quoteResponse) {
		throw Error('Can not fetch swap quote, please try again!');
	}

	const res = await fetch(`${environment.JUPITER_API_ENDPOINT}/swap`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			quoteResponse,
			userPublicKey,
			wrapAndUnwrapSol,
		}),
	});
	if (!res.ok) {
		throw Error('Something went wrong, can not swap!');
	}

	const { swapTransaction } = await res.json();
	const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
	const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

	return transaction;
};
