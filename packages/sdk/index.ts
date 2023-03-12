import {
	PublicKey,
	SendOptions,
	Transaction,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';
import { EventEmitter } from 'eventemitter3';

export class Walless extends EventEmitter {
	_publicKey?: PublicKey;
	_isConnected: boolean;

	constructor() {
		super();

		this._isConnected = false;
		this._publicKey = undefined;
	}

	connect(options?: {
		onlyIfTrusted?: boolean;
	}): Promise<{ publicKey: PublicKey }> {
		if (this._isConnected) {
			throw new Error('provider already connected');
		}

		this._isConnected = true;
		console.log(options);

		return '' as never;
	}

	async disconnect() {
		console.log('imagine that you are disconnected, hehe!');
	}

	public get publicKey() {
		return this._publicKey;
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
