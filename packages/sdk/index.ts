// import * as suiProvider from './providers/sui';
import {
	type SignedMessage,
	type SignedTransaction,
	type TransactionBlock,
	Ed25519PublicKey as SuiPublicKey,
} from '@mysten/sui.js';
import { type SuiSignAndExecuteTransactionBlockOutput } from '@mysten/wallet-standard';
import {
	type SendOptions,
	PublicKey as SolanaPublicKey,
	VersionedTransaction,
} from '@solana/web3.js';
import {
	type ConnectFunc,
	type ConnectOptions,
	type SignAllFunc,
	type SignAndSendFunc,
	type SignFunc,
	type SignMessageFunc,
	Networks,
} from '@walless/core';
import { type PublicKeyDocument } from '@walless/store';
import { decode, encode } from 'bs58';
import { EventEmitter } from 'eventemitter3';

import { type PublicKeyType } from '../wallet-standard/src/util';

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

		if (response.message) {
			throw new Error(response.message);
		}

		this.#publicKeys = publicKeys
			.map((pk: PublicKeyDocument) => {
				let publicKey: PublicKeyType;

				// Prepare suitable public key for each network
				if (pk.network === Networks.solana) {
					publicKey = new SolanaPublicKey(pk._id as string);
				} else if (pk.network === Networks.sui) {
					publicKey = new SuiPublicKey(
						new Uint8Array(
							Buffer.from((pk._id as string).replace(/0x/, ''), 'hex'),
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

		if (res.signedTransaction) {
			return VersionedTransaction.deserialize(
				decode(res.signedTransaction),
			) as never;
		} else {
			throw new Error(res.message as string);
		}
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
		if (res.signature) {
			return { signature: decode(res.signature) };
		} else {
			throw new Error(res.message);
		}
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
