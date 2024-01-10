import type { Endpoint } from '@walless/core';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { EndpointsDocument, PublicKeyDocument } from '@walless/store';
import { selectors } from '@walless/store';

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
	const crawlers: Record<string, EngineCrawler<unknown>> = {};
	let endpoints = (await storage.safeGet('endpoints')) as EndpointsDocument;

	if (!endpoints) {
		endpoints = { _id: 'endpoints', type: 'EndpointMap', ...defaultEndpoints };
		storage.upsert('endpoints', async () => endpoints);
	}

	const startEngine = async () => {
		const allKey = await storage.find<PublicKeyDocument>(selectors.allKeys);

		for (const network of Object.keys(Networks)) {
			const isNetworkAvailable = allKey.docs.find((i) => i.network === network);

			if (isNetworkAvailable) {
				if (network === Networks.solana) {
					crawlers[Networks.solana]?.stop();
					crawlers[Networks.solana] = createCrawler({
						endpoint: endpoints.solana,
						pool: solanaPool,
						start: solanaEngineRunner.start,
						stop: solanaEngineRunner.stop,
					});
					crawlers[Networks.solana].start();
				} else if (network === Networks.sui) {
					crawlers[Networks.sui]?.stop();
					crawlers[Networks.sui] = createCrawler({
						endpoint: endpoints.sui,
						pool: suiPool,
						start: suiEngineRunner.start,
						stop: suiEngineRunner.stop,
					});
					crawlers[Networks.sui].start();
				} else if (network === Networks.tezos) {
					crawlers[Networks.tezos]?.stop();
					crawlers[Networks.tezos] = createCrawler({
						endpoint: endpoints.tezos,
						pool: tezosPool,
						start: tezosEngineRunner.start,
						stop: tezosEngineRunner.stop,
					});
					crawlers[Networks.tezos].start();
				} else if (network === Networks.aptos) {
					crawlers[Networks.aptos]?.stop();
					crawlers[Networks.aptos] = createCrawler({
						endpoint: endpoints.aptos,
						pool: aptosPool,
						start: aptosEngineRunner.start,
						stop: aptosEngineRunner.stop,
					});
					crawlers[Networks.aptos].start();
				}
			}
		}
	};

	return {
		getEndpoint: (network) => endpoints[network],
		setEndpoint: (network, id) => {
			endpoints[network] = id;
			crawlers[network]?.setEndpoint(id);
		},
		start: startEngine,
		getConnection: (network) => crawlers[network]?.connection as never,
	};
};

export * from './utils/crawler';
export * from './utils/pool';
