import type { EngineConfig, Runner } from '../../types';

export type AptosContext = {
	connection: unknown;
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
