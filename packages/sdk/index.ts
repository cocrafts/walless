import type { SignatureWithBytes } from '@mysten/sui.js/cryptography';
import type { TransactionBlock } from '@mysten/sui.js/transactions';
import type {
	SuiSignAndExecuteTransactionBlockOutput,
	SuiSignTransactionBlockOutput,
} from '@mysten/wallet-standard';
import type { SendOptions } from '@solana/web3.js';
import type { Networks } from '@walless/core';
import { logger, ResponseCode } from '@walless/core';
import { decode, encode } from 'bs58';
import { EventEmitter } from 'eventemitter3';

import * as common from './providers/common';
import * as solana from './providers/solana';
import * as sui from './providers/sui';
import type {
	ConnectFunc,
	ConnectOptions,
	SignAllFunc,
	SignAndSendFunc,
	SignFunc,
	SignMessageFunc,
} from './utils/type';

export class Walless extends EventEmitter {
	#publicKeys?: Array<{ publicKey: Uint8Array; network: Networks }>;
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

		const { publicKeys = [] } = await common.requestConnect({
			...options,
			onlyIfTrusted: options?.onlyIfTrusted || true, // set default onlyIfTrusted to true because options from wallet-standard seem not work
			domain: hostName,
		} as ConnectOptions);

		this.#publicKeys = publicKeys.map(({ publicKey, network }) => {
			return {
				publicKey: decode(publicKey),
				network,
			};
		});
		this.#isConnected = true;

		logger.debug('walless connected!');
		return { publicKeys: this.#publicKeys };
	};

	disconnect = async (): Promise<void> => {
		this.#isConnected = false;
		const hostName = window.location.hostname;
		await common.requestDisconnect({ domain: hostName });
		logger.debug('walless disconnected!');
	};

	signAndSendTransactionOnSolana: SignAndSendFunc = async (
		transaction,
		options?,
	) => {
		if (!this.#publicKeys) {
			throw new Error('wallet not connected');
		}

		const res = await solana.requestSignAndSendTransaction(
			encode(transaction),
			options as SendOptions,
		);

		const signature = res.signatureString;

		return { signature };
	};

	signTransactionOnSolana: SignFunc = async (transaction) => {
		if (!this.#publicKeys) throw Error('wallet not connected');

		const res = await solana.requestSignTransaction(encode(transaction));
		if (res.signedTransaction) {
			return decode(res.signedTransaction);
		} else {
			throw new Error(res.message as string);
		}
	};

	signAllTransactionsOnSolana: SignAllFunc = (transactions) => {
		logger.debug(transactions);
		return [] as never;
	};

	signMessageOnSolana: SignMessageFunc = async (message) => {
		if (!this.#publicKeys) throw Error('wallet not connected');

		const res = await solana.requestSignMessage(encode(message));
		if (res.signature) {
			return { signature: decode(res.signature) };
		} else {
			throw new Error(res.message);
		}
	};

	signMessageOnSui = async (
		message: Uint8Array,
	): Promise<SignatureWithBytes> => {
		if (!this.#publicKeys) throw Error('wallet not connected');

		const res = await sui.requestSignMessage(encode(message));
		const signedMessage: SignatureWithBytes = res.signedMessage;

		return signedMessage;
	};

	signTransactionBlockOnSui = async (
		transaction: TransactionBlock,
	): Promise<SuiSignTransactionBlockOutput> => {
		if (!this.#publicKeys) throw Error('wallet not connected');

		const res = await sui.requestSignTransactionBlock(transaction.serialize());
		const signedTransaction: SuiSignTransactionBlockOutput =
			res.signedTransaction;

		return signedTransaction;
	};

	signAndExecuteTransactionBlock = async (
		transaction: TransactionBlock,
		options: unknown,
	): Promise<SuiSignAndExecuteTransactionBlockOutput> => {
		if (!this.#publicKeys) throw Error('wallet not connected');

		const res = await sui.requestSignAndExecuteTransactionBlock(
			transaction.serialize(),
			options,
		);
		const signedTransaction: SuiSignAndExecuteTransactionBlockOutput =
			res.signedTransaction;

		return signedTransaction;
	};

	installLayout = async (id: string): Promise<boolean> => {
		if (!this.#publicKeys) throw Error('wallet not connected');

		let isSuccessfullyInstalled = false;
		try {
			const { responseCode } = await common.requestInstallLayout(id);
			isSuccessfullyInstalled = responseCode === ResponseCode.SUCCESS;
		} catch (error) {
			throw new Error('not successfully installed');
		}

		return isSuccessfullyInstalled;
	};

	checkInstalledLayout = async (id: string): Promise<boolean> => {
		const { responseCode } = await common.requestCheckInstalledLayout(id);

		return responseCode === ResponseCode.SUCCESS;
	};

	openLayoutPopup = async (id: string): Promise<boolean> => {
		const { responseCode } = await common.requestOpenLayoutPopup(id);

		return responseCode === ResponseCode.SUCCESS;
	};
}

export default Walless;

export * from './utils/type';
