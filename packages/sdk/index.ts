// import * as suiProvider from './providers/sui';
import {
	Ed25519PublicKey as SuiPublicKey,
	SignedMessage,
	SignedTransaction,
	TransactionBlock,
} from '@mysten/sui.js';
import { SuiSignAndExecuteTransactionBlockOutput } from '@mysten/wallet-standard';
import {
	PublicKey as SolanaPublicKey,
	SendOptions,
	VersionedTransaction,
} from '@solana/web3.js';
import {
	ConnectFunc,
	ConnectOptions,
	Networks,
	SignAllFunc,
	SignAndSendFunc,
	SignFunc,
	SignMessageFunc,
} from '@walless/core';
import { PublicKeyRecord } from '@walless/storage';
import { decode, encode } from 'bs58';
import { EventEmitter } from 'eventemitter3';

import { PublicKeyType } from '../wallet-standard/src/util';

import * as mutualProvider from './providers/mutual';
import * as solanaProvider from './providers/solana';
import * as suiProvider from './providers/sui';

export class Walless extends EventEmitter {
	#publicKeys:
		| Array<{ publicKey: PublicKeyType; network: Networks }>
		| undefined;
	#isConnected: boolean;

	constructor() {
		super();

		this.#isConnected = false;
		this.#publicKeys = undefined;
	}

	public get publicKeys() {
		return this.#publicKeys;
	}

	connect: ConnectFunc = async (options?) => {
		if (this.#isConnected) {
			throw new Error('provider already connected');
		}

		const hostName = window.location.hostname;

		const response = await mutualProvider.requestConnect({
			...options,
			domain: hostName,
		} as ConnectOptions);

		const publicKeys = response.publicKeys;

		this.#publicKeys = publicKeys
			.map((pk: PublicKeyRecord) => {
				let publicKey: PublicKeyType;

				// Prepare suitable public key for each network
				if (pk.network === Networks.solana) {
					publicKey = new SolanaPublicKey(pk.id as string);
				} else if (pk.network === Networks.sui) {
					publicKey = new SuiPublicKey(
						new Uint8Array(
							Buffer.from((pk.id as string).replace(/0x/, ''), 'hex'),
						),
					);
				} else {
					return null;
				}

				// Init public key
				return {
					publicKey: publicKey,
					network: pk.network,
				};
			})
			.filter((publicKey: PublicKeyType | null) => publicKey);
		this.#isConnected = true;

		return { publicKeys };
	};

	disconnect = async (): Promise<void> => {
		this.#isConnected = false;
		console.log('walless disconnected!');
	};

	signAndSendTransactionOnSolana: SignAndSendFunc = async (
		transaction,
		options?,
	) => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		const res = await solanaProvider.requestSignAndSendTransaction(
			encode(transaction.serialize()),
			options as SendOptions,
		);

		const signature = res.signatureString;

		return { signature };
	};

	signTransactionOnSolana: SignFunc = async (transaction) => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		const res = await solanaProvider.requestSignTransaction(
			encode(transaction.serialize()),
		);

		return VersionedTransaction.deserialize(
			decode(res.signedTransaction),
		) as never;
	};

	signAllTransactionsOnSolana: SignAllFunc = (transactions) => {
		console.log(transactions);

		return [] as never;
	};

	signMessageOnSolana: SignMessageFunc = async (message) => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		const res = await solanaProvider.requestSignMessage(encode(message));
		return { signature: decode(res.signature) };
	};

	signMessageOnSui = async (message: Uint8Array): Promise<SignedMessage> => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		const res = await suiProvider.requestSignMessage(encode(message));

		const signedMessage: SignedMessage = res.signedMessage;

		return signedMessage;
	};

	signTransactionBlockOnSui = async (
		transaction: TransactionBlock,
		chain: unknown,
	): Promise<SignedTransaction> => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		console.log('Chain', chain);

		const res = await suiProvider.requestSignTransactionBlock(
			transaction.serialize(),
		);

		const signedTransaction: SignedTransaction = res.signedTransaction;

		return signedTransaction;
	};

	signAndExecuteTransactionBlock = async (
		transaction: TransactionBlock,
		options: unknown,
	): Promise<SuiSignAndExecuteTransactionBlockOutput> => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		const res = await suiProvider.requestSignAndExecuteTransactionBlock(
			transaction.serialize(),
			options,
		);

		const signedTransaction: SuiSignAndExecuteTransactionBlockOutput =
			res.signedTransaction;

		return signedTransaction;
	};
}

export default Walless;
