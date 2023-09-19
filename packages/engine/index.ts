import type { Endpoint, EndpointMap, Networks } from '@walless/core';
import type { Database, EndpointsDocument } from '@walless/store';
import type { GraphQLClient } from 'graphql-request';

import { aptosEngineRunner } from './aptos/crawler';
import { aptosPool } from './aptos/pool';
import { createCrawler } from './utils/crawler';
import type { EngineCrawler } from './utils/type';
import { solanaEngineRunner, solanaPool } from './solana';
import { suiEngineRunner, suiPool } from './sui';
import { tezosEngineRunner, tezosPool } from './tezos';

export interface Engine {
	start: () => void;
	setEndpoint: (network: Networks, id: Endpoint) => void;
	getEndpoint: (network: Networks) => Endpoint;
	getConnection: <T>(network: Networks) => T;
}

const defaultEndpoint: Endpoint = __DEV__ ? 'devnet' : 'mainnet';
export const defaultEndpoints: EndpointMap = {
	solana: defaultEndpoint,
	sui: defaultEndpoint,
	ethereum: defaultEndpoint,
	tezos: defaultEndpoint,
	aptos: defaultEndpoint,
};

export interface EngineOptions {
	storage: Database;
	qlClient: GraphQLClient;
}

export const createEngine = async ({
	storage,
	qlClient,
}: EngineOptions): Promise<Engine> => {
	let endpoints = (await storage.safeGet('endpoints')) as EndpointsDocument;

	if (!endpoints) {
		endpoints = {
			_id: 'endpoints',
			type: 'EndpointMap',
			...defaultEndpoints,
		};

		storage.upsert('endpoints', async () => endpoints);
	}

	/* eslint-disable-next-line */
	const crawlers: Record<string, EngineCrawler<any>> = {
		sui: createCrawler({
			storage,
			qlClient,
			endpoint: endpoints.sui,
			pool: suiPool,
			start: suiEngineRunner.start,
			stop: suiEngineRunner.stop,
		}),
		solana: createCrawler({
			storage,
			qlClient,
			endpoint: endpoints.solana,
			pool: solanaPool,
			start: solanaEngineRunner.start,
			stop: solanaEngineRunner.stop,
		}),
		tezos: createCrawler({
			storage,
			qlClient,
			endpoint: endpoints.tezos,
			pool: tezosPool,
			start: tezosEngineRunner.start,
			stop: tezosEngineRunner.stop,
		}),
		aptos: createCrawler({
			storage,
			qlClient,
			endpoint: endpoints.aptos ?? 'devnet',
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
			crawlers.sui.start();
			crawlers.solana.start();
			crawlers.tezos.start();
			crawlers.aptos.start();
		},
		getConnection: (network) => crawlers[network]?.connection,
	};
};

export * from './state/collectibles';
export * from './state/tokens';
export * from './state/wallets';
export * from './utils/crawler';
export * from './utils/pool';
