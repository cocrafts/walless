import type { Provider } from 'aptos';

import type { EngineConfig, Runner } from '../../types';

export type AptosContext = {
	provider: Provider;
};

export const createAptosRunner = (config: EngineConfig): Runner => {
	console.log(config);
	return {
		start() {},
		stop() {},
		getContext: (): AptosContext => {
			return {} as AptosContext;
		},
	};
};
