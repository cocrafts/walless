import type { Database } from '@walless/store';

import type { CreateFunction, Engine, EngineConfig, EnginePool } from './types';
import { getEndpoints } from './utils';

export let engine: Engine;

export const setDefaultEngine = (e: Engine) => {
	engine = e;
};

export const createEngine = async (storage: Database): Promise<Engine> => {
	const createPool: Record<string, CreateFunction> = {};
	const enginePool: EnginePool = {} as never;
	const endpoints = await getEndpoints(storage);
	const config: EngineConfig = { endpoints, storage };

	return {
		register: (key: string, create: CreateFunction) => {
			if (createPool[key]) {
				throw Error(`cannot register create function with key ${key}`);
			}
			createPool[key] = create;
		},
		start: async () => {
			const keys = Object.keys(createPool);
			if (keys.length === 0) {
				throw Error('no runner found, need to register runner before start');
			}

			keys.forEach((key) => {
				const runner = createPool[key](config);
				enginePool[key] = runner;
				runner.start();
			});
		},
		stop: () => {
			const runners = Object.values(enginePool);
			runners.forEach((r) => r.stop());
		},
		getContext: <T>(key: string) => {
			return enginePool[key]?.getContext() as T;
		},
	};
};

export * from './types';
