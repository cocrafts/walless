export type SwapQuote = {
	inputMint: string;
	inAmount: string;
	outputMint: string;
	outAmount: string;
	swapMode: 'ExactIn' | 'ExactOut';
	slippageBps: number;
	platformFee: number | null;
	priceImpactPct: string;
	routePlan: {
		swapInfo: SwapQuoteInfo;
		percent: number;
	}[];
	contextSlot: number;
	timeTaken: number;
};

export type SwapQuoteInfo = {
	ammKey: string;
	label: string;
	inputMint: string;
	outputMint: string;
	inAmount: string;
	outAmount: string;
	feeAmount: string;
	feeMint: string;
};
