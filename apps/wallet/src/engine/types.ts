import type { Networks } from '@walless/core';
import type { EndpointsDocument } from '@walless/store';

export interface Runner {
	start: () => void;
	stop: () => void;
	getContext: () => unknown;
}

export interface Engine {
	register: (key: string, create: CreateFunction) => void;
	start: () => void;
	stop: () => void;
	getContext: <T>(network: Networks) => T;
}

export type CreateFunction = (config: EngineConfig) => Runner;

export type EnginePool = Record<string, Runner>;

export type EngineConfig = {
	endpoints: EndpointsDocument;
};
