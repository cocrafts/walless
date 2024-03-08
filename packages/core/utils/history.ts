import type { Networks } from './common';

export interface TransactionHistory {
	id: string;
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

export interface SolanaTransferHistory {
	transactionType: 'Sent' | 'Received';
	sender: string;
	receiver: string;
	amount: number;
	token: SolanaTokenMetadata;
}

export interface SolanaTransferHistoryV2
	extends SolanaTransactionHistory,
		SolanaTransferHistory {
	fee: number;
	tokenForFee: SolanaTokenMetadata;
	preBalance?: number;
	postBalance?: number;
}

export interface SolanaSwapHistory {
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

export interface SolanaSwapHistoryV2
	extends SolanaTransactionHistory,
		SolanaSwapHistory {
	fee: number;
	tokenForFee: SolanaTokenMetadata;
}

export interface SolanaUnknownHistory extends SolanaTransactionHistory {
	transactionType: 'Unknown';
}
