import type {
	Transaction,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';
import type { PublicKey, SendOptions } from '@solana/web3.js';
import type { Networks } from '@walless/core';

export interface ConnectOptions {
	onlyIfTrusted?: boolean;
	domain?: string;
	network?: Networks;
}

export interface ConnectResult {
	publicKeys: Array<PublicKey>;
}

export type ConnectFunc = (options: ConnectOptions) => Promise<ConnectResult>;

export interface SignAndSendResult {
	signature: TransactionSignature;
}

export type SignAndSendFunc = <T extends Transaction | VersionedTransaction>(
	transaction: T,
	options?: SendOptions,
) => Promise<SignAndSendResult>;

export type SignFunc = <T extends Transaction | VersionedTransaction>(
	transaction: T,
) => Promise<T>;

export type SignAllFunc = <T extends Transaction | VersionedTransaction>(
	transactions: T[],
) => Promise<T[]>;

export interface SignMessageResult {
	signature: Uint8Array;
}

export type SignMessageFunc = (
	message: Uint8Array,
) => Promise<SignMessageResult>;

export interface TezosTransaction {
	type: 'native' | 'custom';
	receiver: string;
	amount: number;
	tokenAddress?: string;
}
