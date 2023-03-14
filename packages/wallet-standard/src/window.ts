import type {
	PublicKey,
	SendOptions,
	Transaction,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';

export interface WallessEvent {
	connect(...args: unknown[]): unknown;

	disconnect(...args: unknown[]): unknown;

	accountChanged(...args: unknown[]): unknown;
}

export interface WallessEventEmitter {
	on<E extends keyof WallessEvent>(
		event: E,
		listener: WallessEvent[E],
		context?: any,
	): void;

	off<E extends keyof WallessEvent>(
		event: E,
		listener: WallessEvent[E],
		context?: any,
	): void;
}

export interface Walless extends WallessEventEmitter {
	publicKey: PublicKey | null;

	connect(options?: {
		onlyIfTrusted?: boolean;
	}): Promise<{ publicKey: PublicKey }>;

	disconnect(): Promise<void>;

	signAndSendTransaction<T extends Transaction | VersionedTransaction>(
		transaction: T,
		options?: SendOptions,
	): Promise<{ signature: TransactionSignature }>;

	signTransaction<T extends Transaction | VersionedTransaction>(
		transaction: T,
	): Promise<T>;

	signAllTransactions<T extends Transaction | VersionedTransaction>(
		transactions: T[],
	): Promise<T[]>;

	signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
}
