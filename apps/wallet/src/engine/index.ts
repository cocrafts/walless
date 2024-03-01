import type { CreateFunction, Engine, EngineConfig, EnginePool } from './types';
import { getNetworkClusters } from './utils';

let engine: Engine;

export const getDefaultEngine = () => {
	return engine;
};

export const setDefaultEngine = (e: Engine) => {
	engine = e;
	Object.freeze(engine);
};

export const createEngine = async (): Promise<Engine> => {
	const createPool: Record<string, CreateFunction> = {};
	const enginePool: EnginePool = {} as never;
	const networkClusters = await getNetworkClusters();
	const config: EngineConfig = { networkClusters };

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

				runner = await create(config);
				enginePool[key] = runner;
				runner.start();
			} else {
				const keys = Object.keys(createPool);
				const createRunnersPromises = keys.map(async (key) => {
					let runner = enginePool[key];
					if (runner) {
						throw Error(`runner ${key} is running, use restart instead`);
					}
					runner = await createPool[key](config);
					enginePool[key] = runner;

					/** start runners asynchronously */
					runner.start();
				});

				/** wait creations when start engine */
				await Promise.all(createRunnersPromises);
			}
		},
		stop: async (key?: string) => {
			if (key) {
				const runner = enginePool[key];
				if (!runner) throw Error(`runner ${key} not found`);
				runner.stop();
			} else {
				const runners = Object.values(enginePool);
				const promises = runners.map(async (r) => await r.stop());
				await Promise.all(promises);
			}
		},
		restart: async (key?: string) => {
			if (key) {
				const runner = enginePool[key];
				if (!runner) throw Error(`runner ${key} not found`);
				runner.restart(config);
			} else {
				const runners = Object.values(enginePool);
				runners.forEach((r) => r.restart(config));
			}
		},
		clear: async (key?: string) => {
			if (key) {
				const runner = enginePool[key];
				if (!runner) throw Error(`runner ${key} not found`);
				runner.stop();
				delete enginePool[key];
				delete createPool[key];
			} else {
				const runners = Object.keys(enginePool);
				runners.forEach((key) => {
					const runner = enginePool[key];
					runner.stop();
					delete enginePool[key];
					delete createPool[key];
				});
			}
		},
		getContext: <T>(key: string) => {
			return enginePool[key]?.getContext() as T;
		},
	};
};

export * from './types';
