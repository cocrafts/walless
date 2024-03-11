import { logger, Networks } from '@walless/core';
import { environment } from 'utils/config';

export const gasilonSupportedNetworks: Networks[] = [Networks.solana];

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
export const getGasilonConfig = async () => {
	if (!gasilonConfig) {
		try {
			const res = await fetch(environment.GASILON_ENDPOINT, { method: 'GET' });
			gasilonConfig = await res.json();
		} catch (error) {
			logger.error('Failed to get gasilon config', error);
			return;
		}
	}

	return gasilonConfig;
};
