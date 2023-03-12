import {
	PublicKey,
	SendOptions,
	Transaction,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';
import { Walless } from '@walless/wallet-standard';
import { EventEmitter } from 'eventemitter3';

export class SolanaWalless extends EventEmitter implements Walless {
	#publicKey?: PublicKey;
	#isConnected: boolean;

	constructor() {
		super();

		this.#isConnected = false;
		this.#publicKey = undefined;
	}

	async connect() {
		if (this.#isConnected) {
			throw new Error('provider already connected');
		}

		this.#isConnected = true;

		return '' as never;
	}

	async disconnect() {
		console.log('imagine that you are disconnected, hehe!');
	}

	public get publicKey() {
		return this.#publicKey;
	}

	signAndSendTransaction<T extends Transaction | VersionedTransaction>(
		transaction: T,
		options?: SendOptions,
	): Promise<{ signature: TransactionSignature }> {
		console.log(transaction, options);

		return {} as never;
	}

	signTransaction<T extends Transaction | VersionedTransaction>(
		transaction: T,
	): Promise<T> {
		console.log(transaction);

		return {} as never;
	}

	signAllTransactions<T extends Transaction | VersionedTransaction>(
		transactions: T[],
	): Promise<T[]> {
		console.log(transactions);

		return [] as never;
	}

	signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }> {
		console.log(message);

		return { signature: [] } as never;
	}
}
