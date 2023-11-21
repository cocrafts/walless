import { TezosToolkit } from '@taquito/taquito';
import type { Token } from '@walless/core';
import { Endpoints } from '@walless/core';

import { createConnectionPool } from '../../utils/pool';
import type { EngineRunner, RunnerContext } from '../../utils/type';

export type TezosRunner = EngineRunner<TezosToolkit>;
export type TezosContext = RunnerContext<TezosToolkit>;

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

export const KNOWN_TEZOS_MAINNET_TOKENS: Omit<Token, 'network'>[] = [
	{
		metadata: {
			name: 'Tether USD',
			symbol: 'USDt',
			imageUri:
				'https://ipfs.io/ipfs/QmRymVGWEudMfLrbjaEiXxngCRTDgWCsscjQMwizy4ZJjX',
		},
		account: {
			tokenId: 0,
			address: 'KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o',
			balance: '0',
			decimals: 6,
		},
	},
	{
		metadata: {
			name: 'youves uUSD',
			symbol: 'uUSD',
			imageUri:
				'https://ipfs.io/ipfs/QmbvhanNCxydZEbGu1RdqkG3LcpNGv7XYsCHgzWBXnmxRd',
		},
		account: {
			tokenId: 0,
			address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
			balance: '0',
			decimals: 12,
		},
	},
	{
		metadata: {
			name: 'Kolibri',
			symbol: 'kUSD',
			imageUri: 'https://kolibri-data.s3.amazonaws.com/logo.png',
		},
		account: {
			tokenId: 0,
			address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
			balance: '0',
			decimals: 18,
		},
	},
	{
		metadata: {
			name: 'Tezos BTC',
			symbol: 'tzBTC',
			imageUri:
				'https://tzbtc.io/wp-content/uploads/2020/03/tzbtc_logo_single.svg',
		},
		account: {
			tokenId: 0,
			address: 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
			balance: '0',
			decimals: 8,
		},
	},
	{
		metadata: {
			name: 'youves uBTC',
			symbol: 'uBTC',
			imageUri:
				'https://ipfs.io/ipfs/Qmbev41h4axBqVzxsXP2NSaAF996bJjJBPb8FFZVqTvJTY',
		},
		account: {
			tokenId: 2,
			address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
			balance: '0',
			decimals: 12,
		},
	},
	{
		metadata: {
			name: 'Quipuswap governance token',
			symbol: 'QUIPU',
			imageUri:
				'https://ipfs.io/ipfs/Qmb2GiHN9EjcrN29J6y9PsXu3ZDosXTv6uLUWGZfRRSzS2/quipu.png',
		},
		account: {
			tokenId: 0,
			address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
			balance: '0',
			decimals: 6,
		},
	},
	{
		metadata: {
			name: 'youves YOU Governance',
			symbol: 'YOU',
			imageUri:
				'https://ipfs.io/ipfs/QmYAJaJvEJuwvMEgRbBoAUKrTxRTT22nCC9RuY7Jy4L4Gc',
		},
		account: {
			tokenId: 0,
			address: 'KT1Xobej4mc6XgEjDoJoHtTKgbD1ELMvcQuL',
			balance: '0',
			decimals: 12,
		},
	},
];
