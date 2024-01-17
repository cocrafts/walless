import type { Database, EndpointsDocument } from '@walless/store';

export interface Runner {
	start: () => void;
	stop: () => void;
	restart: (config: EngineConfig) => void;
	getContext: () => unknown;
}

export interface Engine {
	register: (key: string, create: CreateFunction) => void;
	start: (key?: string) => void;
	stop: (key?: string) => void;
	restart: (key?: string) => void;
	getContext: <T>(key: string) => T;
}

export type CreateFunction = (config: EngineConfig) => Runner;

export type EnginePool = Record<string, Runner>;

export type EngineConfig = {
	endpoints: EndpointsDocument;
	storage: Database;
};
