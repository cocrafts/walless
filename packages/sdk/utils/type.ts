import type { TransactionSignature } from '@solana/web3.js';
import type { SendOptions } from '@solana/web3.js';
import type { Networks } from '@walless/core';

export interface ConnectOptions {
	onlyIfTrusted?: boolean;
	domain?: string;
	network?: Networks;
}

export interface ConnectResult {
	publicKeys: Array<{ publicKey: Uint8Array; network: Networks }>;
}

export type ConnectFunc = (options: ConnectOptions) => Promise<ConnectResult>;

export interface SignAndSendResult {
	signature: TransactionSignature;
}

export type SignAndSendFunc = (
	transaction: Uint8Array,
	options?: SendOptions,
) => Promise<SignAndSendResult>;

export type SignFunc = (transaction: Uint8Array) => Promise<Uint8Array>;

export type SignAllFunc = (transactions: Uint8Array[]) => Promise<Uint8Array[]>;

export interface SignMessageResult {
	signature: Uint8Array;
}

export type SignMessageFunc = (
	message: Uint8Array,
) => Promise<SignMessageResult>;
