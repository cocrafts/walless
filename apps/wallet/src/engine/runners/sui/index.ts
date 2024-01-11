import type { EngineConfig, Runner } from '../../types';

export type suiContext = {
	connection: unknown;
};

export const createSuiRunner = (config: EngineConfig): Runner => {
	console.log(config);
	return {
		start() {},
		stop() {},
		getContext: (): suiContext => {
			return {} as suiContext;
		},
	};
};
