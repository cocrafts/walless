import { type Endpoint, Networks } from '@walless/core';
import { type Database } from '@walless/store';

import { createCrawler } from './utils/crawler';
import { type EngineCrawler } from './utils/type';
import { solanaEngineRunner, solanaPool } from './solana';
import { suiEngineRunner, suiPool } from './sui';

export interface Engine {
	start: () => void;
	setEndpoint: (network: Networks, id: Endpoint) => void;
	getEndpoint: (network: Networks) => Endpoint;
}

interface CreateEngineOptions {
	storage: Database;
	defaultEndpoint: Endpoint;
}

export const createEngine = ({
	storage,
	defaultEndpoint,
}: CreateEngineOptions): Engine => {
	const endpoints: Record<Networks, Endpoint> = {
		sui: defaultEndpoint,
		solana: defaultEndpoint,
		ethereum: defaultEndpoint,
	};

	/* eslint-disable-next-line */
	const crawlers: Record<string, EngineCrawler<any>> = {
		sui: createCrawler({
			storage,
			endpoint: defaultEndpoint,
			pool: suiPool,
			start: suiEngineRunner.start,
			stop: suiEngineRunner.stop,
		}),
		solana: createCrawler({
			storage,
			endpoint: defaultEndpoint,
			pool: solanaPool,
			start: solanaEngineRunner.start,
			stop: solanaEngineRunner.stop,
		}),
	};

	return {
		getEndpoint: (network) => endpoints[network],
		setEndpoint: (network, id) => {
			endpoints[network] = id;
			crawlers[network]?.setEndpoint(id);
		},
		start: () => {
			crawlers.sui.start();
			crawlers.solana.start();
		},
	};
};

export * from './state/tokens';
export * from './utils/crawler';
export * from './utils/pool';
