import type { EngineConfig, Runner } from './types';

type CreateFunction = (config: EngineConfig) => Runner;
const creators: Record<string, CreateFunction> = {};

export const registerRunner = (key: string, create: CreateFunction) => {
	if (creators[key]) {
		throw Error(`cannot register create function with key ${key}`);
	}
	creators[key] = create;
};

export const createRunner = (key: string, config: EngineConfig): Runner => {
	const create = creators[key];
	if (create) return create(config);

	throw Error(`not found creator to create runner for ${key}`);
};
