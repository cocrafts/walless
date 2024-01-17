import type { Database, EndpointsDocument } from '@walless/store';

export interface Runner {
	start: () => Promise<void>;
	stop: () => Promise<void>;
	restart: (config: EngineConfig) => Promise<void>;
	getContext: () => unknown;
}

export interface Engine {
	register: (key: string, create: CreateFunction) => void;
	start: (key?: string) => Promise<void>;
	stop: (key?: string) => Promise<void>;
	restart: (key?: string) => Promise<void>;
	getContext: <T>(key: string) => T;
}

export type CreateFunction = (config: EngineConfig) => Promise<Runner> | Runner;

export type EnginePool = Record<string, Runner>;

export type EngineConfig = {
	endpoints: EndpointsDocument;
	storage: Database;
};
