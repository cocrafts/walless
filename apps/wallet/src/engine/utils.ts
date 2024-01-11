import { type Endpoint, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import {
	type EndpointsDocument,
	type PublicKeyDocument,
	selectors,
} from '@walless/store';

import { createRunner } from './create';
import type { EngineConfig, EnginePool } from './types';

export const getEndpoints = async () => {
	const { storage } = modules;
	let endpoints = (await storage.safeGet('endpoints')) as EndpointsDocument;

	if (!endpoints) {
		endpoints = { _id: 'endpoints', type: 'EndpointMap', ...defaultEndpoints };
		await storage.upsert('endpoints', async () => endpoints);
	}

	return endpoints;
};

const defaultEndpoint: Endpoint = __DEV__ ? 'devnet' : 'mainnet';

export const defaultEndpoints = {
	solana: defaultEndpoint,
	sui: defaultEndpoint,
	tezos: defaultEndpoint,
	aptos: defaultEndpoint,
};

export const initNetworkRunner = async (
	enginePool: EnginePool,
	config: EngineConfig,
) => {
	const { storage } = modules;
	const keys = (await storage.find<PublicKeyDocument>(selectors.allKeys)).docs;
	Object.values(Networks).forEach((network) => {
		const isNetworkAvailable = !!keys.find((i) => i.network === network);
		if (!isNetworkAvailable) return;

		enginePool[network]?.stop();
		enginePool[network] = createRunner(network, config);
		enginePool[network].start();
	});
};
