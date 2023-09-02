import type {
	AccountInfo,
	ParsedAccountData,
	PublicKey,
} from '@solana/web3.js';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import pThrottle from 'p-throttle';

import { createConnectionPool } from '../../utils/pool';
import type { EngineRunner, RunnerContext } from '../../utils/type';

export type SolanaRunner = EngineRunner<Connection>;
export type SolanaContext = RunnerContext<Connection>;
export interface ParsedAccount {
	key: PublicKey;
	account: AccountInfo<ParsedAccountData>;
}

export const solanaPool = createConnectionPool<Connection>({
	create: (id) => new Connection(solanaEndpoints[id]),
});

export const solanaEndpoints: Record<string, string> = {
	devnet: clusterApiUrl('devnet'),
	testnet: clusterApiUrl('testnet'),
	mainnet: clusterApiUrl('mainnet-beta'),
};

export const now = Date.now();
/* Solana RPC have rate limit around 40 calls every 10 second */
export const throttle = pThrottle({ limit: 4, interval: 1000 });

export const tokenFilter = ({ account }: ParsedAccount) => {
	return account.data.parsed.info.tokenAmount.decimals > 0;
};

export const getTokenQuotes = async (
	{ qlClient }: SolanaContext,
	addresses: string[],
): Promise<Record<string, TokenInfo>> => {
	const result: Record<string, TokenInfo> = {};
	const response = await qlClient.request<
		{ tokensByAddress: TokenInfo[] },
		{ addresses: string[] }
	>(queries.tokensByAddress, { addresses });

	for (const item of response.tokensByAddress || []) {
		result[item.address as string] = item;
	}

	return result;
};
