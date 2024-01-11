import type { Networks } from '@walless/core';

import type { Engine, EngineConfig, EnginePool } from './types';
import { getEndpoints, initNetworkRunner } from './utils';

export const createEngine = async (): Promise<Engine> => {
	const enginePool: EnginePool = {} as never;
	const endpoints = await getEndpoints();
	const config: EngineConfig = { endpoints };

	return {
		start: async () => {
			initNetworkRunner(enginePool, config);
		},
		stop: () => {
			const runners = Object.values(enginePool);
			runners.forEach((r) => r.stop());
		},
		getContext: <T>(network: Networks) => {
			return enginePool[network].getContext() as T;
		},
	};
};
