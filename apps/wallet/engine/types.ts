import type { Networks } from '@walless/core';
import type { EndpointsDocument } from '@walless/store';

export interface Runner {
	start: () => void;
	stop: () => void;
	getContext: () => unknown;
}

export interface Engine {
	start: () => void;
	stop: () => void;
	getNetworkContext: <T>(network: Networks) => T;
}

export type EngineConfig = {
	endpoints: EndpointsDocument;
};
