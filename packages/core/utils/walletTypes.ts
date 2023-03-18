import {
	PublicKey,
	SendOptions,
	Transaction,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';

export interface ConnectOptions {
	onlyIfTrusted: boolean;
}

export interface ConnectResult {
	publicKey: PublicKey;
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
