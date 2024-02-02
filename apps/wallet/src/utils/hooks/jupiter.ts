import { useMemo } from 'react';
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
};

const jupiterContext = proxy<JupiterContext>({
	tokens: [],
});

export const useJupiterContext = () => {
	const ctx = useSnapshot(jupiterContext);

	return useMemo(() => {
		if (ctx.tokens.length === 0) {
			fetch('https://token.jup.ag/strict').then(async (res) => {
				jupiterContext.tokens = (await res.json()) as JupiterToken[];
			});
		}

		return ctx as JupiterContext;
	}, [ctx]);
};
