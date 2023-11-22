import type { TokenDocument } from '@walless/store';

type GasilonToken = {
	name: string;
	mint: string;
	decimals: string;
};
type GasilonConfig = {
	feePayer: string;
	transfer: {
		tokens: GasilonToken[];
	};
};

let gasilonConfig: GasilonConfig;

export const getGasilonTokens = async () => {
	if (!gasilonConfig) {
		try {
			const res = await fetch(GASILON_ENDPOINT, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			gasilonConfig = await res.json();
		} catch {
			return [];
		}
	}

	return gasilonConfig.transfer.tokens;
};

export const filterGasilonTokens = async (tokens: TokenDocument[]) => {
	const gasilonTokens = await getGasilonTokens();
	return tokens.filter(
		(token) => !!gasilonTokens.find((t) => t.mint === token.account.mint),
	);
};
