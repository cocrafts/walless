import {
	Keypair,
	PublicKey,
	SendOptions,
	Transaction,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';
import { EventEmitter } from 'eventemitter3';

import { requestConnect } from './utils/messaging';

export class Walless extends EventEmitter {
	#publicKey?: PublicKey;
	#isConnected: boolean;

	constructor() {
		super();

		this.#isConnected = false;
		this.#publicKey = undefined;
	}

	async connect(options?: {
		onlyIfTrusted?: boolean;
	}): Promise<{ publicKey: PublicKey }> {
		if (this.#isConnected) {
			throw new Error('provider already connected');
		}

		requestConnect(options);
		const keypair = Keypair.generate();

		this.#publicKey = keypair.publicKey;
		this.#isConnected = true;

		return {
			publicKey: keypair.publicKey,
		};
	}

	async disconnect() {
		this.#isConnected = false;
		console.log('walless disconnected!');
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

export default Walless;
