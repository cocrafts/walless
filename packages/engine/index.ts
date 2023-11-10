import type { Endpoint, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { EndpointsDocument } from '@walless/store';

import { aptosEngineRunner, aptosPool } from './crawlers/aptos';
import { solanaEngineRunner, solanaPool } from './crawlers/solana';
import { suiEngineRunner, suiPool } from './crawlers/sui';
import { tezosEngineRunner, tezosPool } from './crawlers/tezos';
import { createCrawler, defaultEndpoints } from './utils/crawler';
import type { EngineCrawler } from './utils/type';

export interface Engine {
	start: () => void;
	setEndpoint: (network: Networks, id: Endpoint) => void;
	getEndpoint: (network: Networks) => Endpoint;
	getConnection: <T>(network: Networks) => T;
}

export const createEngine = async (): Promise<Engine> => {
	const { storage } = modules;
	let endpoints = (await storage.safeGet('endpoints')) as EndpointsDocument;

	if (!endpoints) {
		endpoints = { _id: 'endpoints', type: 'EndpointMap', ...defaultEndpoints };
		storage.upsert('endpoints', async () => endpoints);
	}

	const crawlers: Record<string, EngineCrawler<unknown>> = {
		solana: createCrawler({
			endpoint: endpoints.solana,
			pool: solanaPool,
			start: solanaEngineRunner.start,
			stop: solanaEngineRunner.stop,
		}),
		sui: createCrawler({
			endpoint: endpoints.sui,
			pool: suiPool,
			start: suiEngineRunner.start,
			stop: suiEngineRunner.stop,
		}),
		tezos: createCrawler({
			endpoint: endpoints.tezos,
			pool: tezosPool,
			start: tezosEngineRunner.start,
			stop: tezosEngineRunner.stop,
		}),
		aptos: createCrawler({
			endpoint: endpoints.aptos,
			pool: aptosPool,
			start: aptosEngineRunner.start,
			stop: aptosEngineRunner.stop,
		}),
	};

	return {
		getEndpoint: (network) => endpoints[network],
		setEndpoint: (network, id) => {
			endpoints[network] = id;
			crawlers[network]?.setEndpoint(id);
		},
		start: () => {
			crawlers.sui?.start();
			crawlers.solana?.start();
			crawlers.tezos?.start();
			crawlers.aptos?.start();
		},
		getConnection: (network) => crawlers[network]?.connection as never,
	};
};

export * from './state/app';
export * from './state/aptos';
export * from './state/collectible';
export * from './state/history';
export * from './state/key';
export * from './state/live';
export * from './state/token';
export * from './state/widget';
export * from './utils/crawler';
export * from './utils/pool';
