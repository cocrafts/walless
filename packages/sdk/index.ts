import { PublicKey } from '@solana/web3.js';
import {
	ConnectFunc,
	SignAllFunc,
	SignAndSendFunc,
	SignFunc,
	SignMessageFunc,
} from '@walless/core';
import { EventEmitter } from 'eventemitter3';

import { requestConnect, requestSignMessage } from './utils/commands';

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

		const response = await requestConnect(options);
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

		console.log(transaction, options);

		return {} as never;
	};

	signTransaction: SignFunc = async (transaction) => {
		console.log(transaction);

		return {} as never;
	};

	signAllTransactions: SignAllFunc = (transactions) => {
		console.log(transactions);

		return [] as never;
	};

	signMessage: SignMessageFunc = async (message) => {
		console.log(message);
		return await requestSignMessage(message);
	};
}

export default Walless;
