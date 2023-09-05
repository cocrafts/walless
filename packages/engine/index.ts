import type { Endpoint, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { EndpointsDocument } from '@walless/store';

import { solanaEngineRunner, solanaPool } from './network/solana';
import { createCrawler, defaultEndpoints } from './utils/crawler';
import type { EngineCrawler } from './utils/type';
// import { suiEngineRunner, suiPool } from './sui';
// import { tezosEngineRunner, tezosPool } from './tezos';

export interface Engine {
	start: () => void;
	setEndpoint: (network: Networks, id: Endpoint) => void;
	getEndpoint: (network: Networks) => Endpoint;
	getConnection: <T>(network: Networks) => T;
}

export const createEngine = async (): Promise<Engine> => {
	let endpoints = (await modules.storage.safeGet(
		'endpoints',
	)) as EndpointsDocument;

	if (!endpoints) {
		endpoints = {
			_id: 'endpoints',
			type: 'EndpointMap',
			...defaultEndpoints,
		};

		modules.storage.upsert('endpoints', async () => endpoints);
	}

	/* eslint-disable-next-line */
	const crawlers: Record<string, EngineCrawler<any>> = {
		solana: createCrawler({
			endpoint: endpoints.solana,
			pool: solanaPool,
			start: solanaEngineRunner.start,
			stop: solanaEngineRunner.stop,
		}),
		// solana: createCrawler({
		// 	endpoint: endpoints.solana,
		// 	pool: solanaPool,
		// 	start: solanaEngineRunner.start,
		// 	stop: solanaEngineRunner.stop,
		// }),
		// sui: createCrawler({
		// 	endpoint: endpoints.sui,
		// 	pool: suiPool,
		// 	start: suiEngineRunner.start,
		// 	stop: suiEngineRunner.stop,
		// }),
		// tezos: createCrawler({
		// 	endpoint: endpoints.tezos,
		// 	pool: tezosPool,
		// 	start: tezosEngineRunner.start,
		// 	stop: tezosEngineRunner.stop,
		// }),
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
		},
		getConnection: (network) => crawlers[network]?.connection,
	};
};

export * from './state/app';
export * from './state/collectible';
export * from './state/history';
export * from './state/key';
export * from './state/live';
export * from './state/token';
export * from './state/transaction';
export * from './state/widget';
export * from './utils/crawler';
export * from './utils/pool';
