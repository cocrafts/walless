import type { EngineConfig, Runner } from '../../types';

export type TezosContext = {
	connection: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTezosRunner = (config: EngineConfig): Runner => {
	return {
		start() {},
		stop() {},
		getContext: (): TezosContext => {
			return {} as TezosContext;
		},
		restart: () => {},
	};
};
