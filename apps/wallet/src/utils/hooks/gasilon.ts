import { useEffect, useState } from 'react';
import type { SolanaToken } from '@walless/core';
import type { TokenDocumentV2 } from '@walless/store';
import { getGasilonConfig } from 'utils/transaction/gasilon';

export const useGasilon = (tokens: TokenDocumentV2<SolanaToken>[]) => {
	const [gasilonTokens, setGasilonTokens] = useState<
		TokenDocumentV2<SolanaToken>[]
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
