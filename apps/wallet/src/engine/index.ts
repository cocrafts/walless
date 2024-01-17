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
		start: async (key?: string) => {
			if (key) {
				let runner = enginePool[key];
				if (runner) {
					throw Error(`runner ${key} is running, use restart instead`);
				}
				const create = createPool[key];
				if (!create) throw Error(`runner ${key} is not registered`);

				runner = create(config);
				enginePool[key] = runner;
				runner.start();
			} else {
				const keys = Object.keys(createPool);
				keys.forEach((key) => {
					let runner = enginePool[key];
					if (runner) {
						throw Error(`runner ${key} is running, use restart instead`);
					}
					runner = createPool[key](config);
					enginePool[key] = runner;
					runner.start();
				});
			}
		},
		stop: (key?: string) => {
			if (key) {
				const runner = enginePool[key];
				if (!runner) throw Error(`runner ${key} not found`);
				runner.stop();
			} else {
				const runners = Object.values(enginePool);
				runners.forEach((r) => r.stop());
			}
		},
		restart(key?: string) {
			if (key) {
				const runner = enginePool[key];
				if (!runner) throw Error(`runner ${key} not found`);
				runner.restart(config);
			} else {
				const runners = Object.values(enginePool);
				runners.forEach((r) => r.restart(config));
			}
		},
		getContext: <T>(key: string) => {
			return enginePool[key]?.getContext() as T;
		},
	};
};

export * from './types';
