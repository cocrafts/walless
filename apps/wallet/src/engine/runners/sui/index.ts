import type { EngineConfig, Runner } from '../../types';

export type suiContext = {
	connection: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSuiRunner = (config: EngineConfig): Runner => {
	return {
		start() {},
		stop() {},
		getContext: (): suiContext => {
			return {} as suiContext;
		},
		restart: () => {},
	};
};
