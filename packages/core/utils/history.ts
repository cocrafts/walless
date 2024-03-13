import type { Networks } from './common';

export interface TransactionHistory {
	cluster: string;
	signature: string;
	network: Networks;
	date: Date;
}

interface SolanaTokenMetadata {
	mint: string;
	name?: string;
	symbol?: string;
	image?: string;
}

interface SolanaTransactionHistory extends TransactionHistory {
	status: 'Success' | 'Failed';
}

export interface SolanaTransferHistoryV1 {
	transactionType: 'Sent' | 'Received';
	sender: string;
	receiver: string;
	amount: number;
	token: SolanaTokenMetadata;
}

export interface SolanaTransferHistory
	extends SolanaTransactionHistory,
		SolanaTransferHistoryV1 {
	fee: number;
	tokenForFee: SolanaTokenMetadata;
	preBalance?: number;
	postBalance?: number;
}

export interface SolanaSwapHistoryV1 {
	transactionType: 'Swap';
	receivedToken: {
		metadata: SolanaTokenMetadata;
		amount: number;
	};
	sentToken: {
		metadata: SolanaTokenMetadata;
		amount: number;
	};
}

export interface SolanaSwapHistory
	extends SolanaTransactionHistory,
		SolanaSwapHistoryV1 {
	fee: number;
	tokenForFee: SolanaTokenMetadata;
}

export interface SolanaUnknownHistoryV1 {
	transactionType: 'Unknown';
}

export type SolanaUnknownHistory = SolanaTransactionHistory &
	SolanaUnknownHistoryV1;
