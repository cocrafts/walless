import { PublicKey, SendOptions, VersionedTransaction } from '@solana/web3.js';
import {
	ConnectFunc,
	ConnectOptions,
	SignAllFunc,
	SignAndSendFunc,
	SignFunc,
	SignMessageFunc,
} from '@walless/core';
import { decode, encode } from 'bs58';
import { EventEmitter } from 'eventemitter3';

import {
	requestConnect,
	requestSignAndSendTransaction,
	requestSignMessage,
	requestSignTransaction,
} from './utils/commands';

export class Walless extends EventEmitter {
	#publicKey?: PublicKey;
	#isConnected: boolean;

	constructor() {
		super();

		this.#isConnected = false;
		this.#publicKey = undefined;
	}

	public get publicKey() {
		return this.#publicKey;
	}

	connect: ConnectFunc = async (options?) => {
		if (this.#isConnected) {
			throw new Error('provider already connected');
		}

		const response = await requestConnect(options as ConnectOptions);
		const publicKey = new PublicKey(response.publicKey as string);

		this.#publicKey = publicKey;
		this.#isConnected = true;

		return { publicKey };
	};

	disconnect = async (): Promise<void> => {
		this.#isConnected = false;
		console.log('walless disconnected!');
	};

	signAndSendTransaction: SignAndSendFunc = async (transaction, options?) => {
		if (!this.#publicKey) {
			throw new Error('wallet not connected');
		}

		const res = await requestSignAndSendTransaction(
			encode(transaction.serialize()),
			options as SendOptions,
		);

		const signature = res.signatureString;

		// Return signature { signature }
		return { signature };
	};

	signTransaction: SignFunc = async (transaction) => {
		if (!this.#publicKey) {
			throw new Error('wallet not connected');
		}

		const res = await requestSignTransaction(encode(transaction.serialize()));

		return VersionedTransaction.deserialize(
			decode(res.signedTransaction),
		) as never;
	};

	signAllTransactions: SignAllFunc = (transactions) => {
		console.log(transactions);

		return [] as never;
	};

	signMessage: SignMessageFunc = async (message) => {
		if (!this.#publicKey) {
			throw new Error('wallet not connected');
		}

		const res = await requestSignMessage(encode(message));
		return { signature: decode(res.signature) };
	};
}

export default Walless;
