import { TezosToolkit } from '@taquito/taquito';
import { Networks } from '@walless/core';
import type { EngineConfig } from 'engine/types';

const MAIN_NET = 'https://api.tez.ie/rpc/mainnet';
const GHOST_NET = 'https://ghostnet.ecadinfra.com';

const TZKT_API_MAINNET = 'https://api.tzkt.io/v1';
const TZKT_API_GHOSTNET = 'https://api.ghostnet.tzkt.io/v1';

export const createContext = (config: EngineConfig) => {
	const { networkClusters } = config;
	const cluster = networkClusters[Networks.tezos];
	const rpc = cluster === 'mainnet' ? MAIN_NET : GHOST_NET;

	const connection = new TezosToolkit(rpc);
	const tzktApi = cluster === 'mainnet' ? TZKT_API_MAINNET : TZKT_API_GHOSTNET;
	return { connection, tzktApi };
};

export const convertTezosImageUriToUrl = (uri: string) => {
	if (!uri) return '';
	if (!uri.startsWith('ipfs://')) return uri;
	const path = uri.replaceAll('ipfs://', '');

	return `https://ipfs.io/ipfs/${path}`;
};
