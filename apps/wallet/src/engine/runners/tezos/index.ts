import type { EngineConfig, Runner } from '../../types';

export type TezosContext = {
	connection: unknown;
};

export const createTezosRunner = (config: EngineConfig): Runner => {
	console.log(config);
	return {
		start() {},
		stop() {},
		getContext: (): TezosContext => {
			return {} as TezosContext;
		},
		restart: () => {},
	};
};
