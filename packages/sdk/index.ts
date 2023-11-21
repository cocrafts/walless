// import * as suiProvider from './providers/sui';
import type {
	SignedMessage,
	SignedTransaction,
	TransactionBlock,
} from '@mysten/sui.js';
import { Ed25519PublicKey as SuiPublicKey } from '@mysten/sui.js';
import type { SuiSignAndExecuteTransactionBlockOutput } from '@mysten/wallet-standard';
import type { SendOptions } from '@solana/web3.js';
import {
	PublicKey as SolanaPublicKey,
	VersionedTransaction,
} from '@solana/web3.js';
import type {
	ConnectFunc,
	ConnectOptions,
	SignAllFunc,
	SignAndSendFunc,
	SignFunc,
	SignMessageFunc,
} from '@walless/core';
import { Networks } from '@walless/core';
import { ResponseCode } from '@walless/messaging';
import type { PublicKeyDocument } from '@walless/store';
import { decode, encode } from 'bs58';
import { EventEmitter } from 'eventemitter3';

import type { PublicKeyType } from '../wallet-standard/src/util';

import * as commonProvider from './providers/common';
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

		const response = await commonProvider.requestConnect({
			...options,
			onlyIfTrusted: options?.onlyIfTrusted || true, // set default onlyIfTrusted to true because options from wallet-standard seem not work
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
		const hostName = window.location.hostname;
		await commonProvider.requestDisconnect({ domain: hostName });
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

	installLayout = async (id: string): Promise<boolean> => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		let isSuccessfullyInstalled = false;
		try {
			const { responseCode } = await commonProvider.requestInstallLayout(id);
			isSuccessfullyInstalled = responseCode === ResponseCode.SUCCESS;
		} catch (error) {
			throw new Error('not successfully installed');
		}

		return isSuccessfullyInstalled;
	};

	checkInstalledLayout = async (id: string): Promise<boolean> => {
		const { responseCode } =
			await commonProvider.requestCheckInstalledLayout(id);

		return responseCode === ResponseCode.SUCCESS;
	};

	openLayoutPopup = async (id: string): Promise<boolean> => {
		const { responseCode } = await commonProvider.requestOpenLayoutPopup(id);

		return responseCode === ResponseCode.SUCCESS;
	};
}

export default Walless;
