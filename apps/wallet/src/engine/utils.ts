import { type Endpoint } from '@walless/core';
import type { Database } from '@walless/store';
import { type EndpointsDocument } from '@walless/store';

export const getEndpoints = async (storage: Database) => {
	let endpoints = await storage.safeGet<EndpointsDocument>('endpoints');

	if (!endpoints) {
		endpoints = { _id: 'endpoints', type: 'EndpointMap', ...defaultEndpoints };
		await storage.put(endpoints);
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
