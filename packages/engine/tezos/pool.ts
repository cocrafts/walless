import { TezosToolkit } from '@taquito/taquito';
import { Endpoints } from '@walless/core';

import { createConnectionPool } from '../utils/pool';

export const tezosPool = createConnectionPool<TezosToolkit>({
	create: (id) => {
		const endpoint = getTezosEndpointFromUnifiedEndpoint(id as Endpoints);
		const tezosToolkit = new TezosToolkit(endpoint);
		return tezosToolkit;
	},
});

export const tezosEndpoints: Record<string, string> = {
	tezosMainnet: 'https://uoi3x99n7c.tezosrpc.midl.dev',
	smartpyMainnet: 'https://mainnet.smartpy.io',
	tezieMainnet: 'https://mainnet.api.tez.ie',
	ghostnetTestnet: 'https://uoi3x99n7c.ghostnet.tezosrpc.midl.dev',
	mumbainetTestnet: 'https://rpc.mumbainet.teztnets.xyz/',
};

export const getTezosEndpointFromUnifiedEndpoint = (endpoint: Endpoints) => {
	if (endpoint == Endpoints.mainnet) return tezosEndpoints.tezosMainnet;
	else if (endpoint == Endpoints.devnet) return tezosEndpoints.ghostnetTestnet;
	else return '';
};
