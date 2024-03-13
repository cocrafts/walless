import type { IdlEvents, IdlTypes } from '@coral-xyz/anchor';
import type { Connection, PublicKey, TokenAmount } from '@solana/web3.js';
import type {
	NetworkCluster,
	SolanaSwapHistoryV1,
	SolanaTransferHistoryV1,
	SolanaUnknownHistoryV1,
} from '@walless/core';

import type { Jupiter } from './history/jupiter';

export type SolanaContext = {
	connection: Connection;
	cluster: NetworkCluster;
};

export type ParsedTokenAccountWithAddress = ParsedTokenAccount & {
	publicKey: PublicKey;
};

export type ParsedTokenAccount = {
	mint: string;
	owner: string;
	state: string;
	tokenAmount: TokenAmount;
};

export interface AccountBalance {
	postBalance?: TokenAmount;
	preBalance?: TokenAmount;
}

export type AccountBalanceMap = Record<string, AccountBalance>;

export type TransactionBalances =
	| SolanaUnknownHistoryV1
	| SolanaTransferHistoryV1
	| SolanaSwapHistoryV1;

export type SwapEvent = IdlEvents<Jupiter>['SwapEvent'];

export interface PartialInstruction {
	programId: PublicKey;
	data: string;
	accounts: PublicKey[];
}

type RoutePlanStep = IdlTypes<Jupiter>['RoutePlanStep'];
export type RoutePlan = RoutePlanStep[];
