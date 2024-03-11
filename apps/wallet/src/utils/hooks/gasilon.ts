import { useEffect, useState } from 'react';
import type { SolanaToken } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import { getGasilonConfig } from 'utils/transaction/gasilon';

export const useGasilon = (tokens: TokenDocument<SolanaToken>[]) => {
	const [gasilonTokens, setGasilonTokens] = useState<
		TokenDocument<SolanaToken>[]
	>([]);

	useEffect(() => {
		(async () => {
			const config = await getGasilonConfig();
			if (!config) return;
			const { tokens: tokensConfig } = config.transfer;

			const filteredTokens = tokens.filter(
				(token) => !!tokensConfig.find((t) => t.mint === token.mint),
			);

			setGasilonTokens(filteredTokens);
		})();
	}, []);

	return gasilonTokens;
};
