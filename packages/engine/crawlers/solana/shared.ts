import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type {
	AccountInfo,
	ParsedAccountData,
	PublicKey,
} from '@solana/web3.js';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { modules } from '@walless/ioc';
import type { TokenDocument } from '@walless/store';
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
	create: (id) => new Connection(getSolanaEndpoint(id)),
});

export const getSolanaEndpoint = (endpoint: string) => {
	const map: Record<string, string> = {
		devnet: clusterApiUrl('devnet'),
		testnet: clusterApiUrl('testnet'),
		mainnet: modules.config.SOLANA_CLUSTER_URL,
	};

	return map[endpoint];
};

export const now = Date.now();
/* Solana RPC have rate limit around 40 calls every 10 second */
export const throttle = pThrottle({ limit: 4, interval: 1000 });

export const tokenProgramFilter = { programId: TOKEN_PROGRAM_ID };

export enum TokenType {
	Fungible,
	SemiFungible,
	NonFungible,
}

export const getTokenType = (
	account: AccountInfo<ParsedAccountData>,
): TokenType => {
	const decimals = account.data.parsed.info.tokenAmount.decimals;

	if (decimals === 0) {
		return TokenType.NonFungible;
	}

	return TokenType.Fungible;
};
