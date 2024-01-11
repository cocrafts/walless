import type { EngineConfig, Runner } from '../../types';

import type { SolanaContext } from './types';

export const createSolanaRunner = (config: EngineConfig): Runner => {
	console.log(config);
	return {
		start() {},
		stop() {},
		getContext: (): SolanaContext => {
			return {} as SolanaContext;
		},
	};
};
