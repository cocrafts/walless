import { useMemo } from 'react';
import { environment } from 'utils/config';
import { proxy } from 'valtio';

import { useSnapshot } from './aliased';

export type JupiterToken = {
	address: string;
	chainId: number;
	decimals: number;
	name: string;
	symbol: string;
	logoURI: string;
	tags: string[];
	extension: string[];
};

type JupiterContext = {
	tokens: JupiterToken[];
	tokensLoading: boolean;
};

const jupiterContext = proxy<JupiterContext>({
	tokens: [],
	tokensLoading: false,
});

export const useJupiterContext = () => {
	const ctx = useSnapshot(jupiterContext);

	return useMemo(() => {
		if (!ctx.tokensLoading && ctx.tokens.length === 0) {
			jupiterContext.tokensLoading = true;
			fetch(`${environment.JUPITER_TOKENS_ENDPOINT}/strict`).then(
				async (res) => {
					jupiterContext.tokens = (await res.json()) as JupiterToken[];
					jupiterContext.tokensLoading = false;
				},
			);
		}

		return ctx as JupiterContext;
	}, [ctx]);
};
