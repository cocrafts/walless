import {
	SuiFeatures,
	SuiSignAndExecuteTransactionBlockMethod,
	SuiSignMessageInput,
	SuiSignMessageMethod,
	SuiSignTransactionBlockMethod,
} from '@mysten/wallet-standard';
import {
	type SolanaSignAndSendTransactionFeature,
	type SolanaSignAndSendTransactionMethod,
	type SolanaSignAndSendTransactionOutput,
	type SolanaSignMessageFeature,
	type SolanaSignMessageMethod,
	type SolanaSignMessageOutput,
	type SolanaSignTransactionFeature,
	type SolanaSignTransactionMethod,
	type SolanaSignTransactionOutput,
	SolanaSignAndSendTransaction,
	SolanaSignMessage,
	SolanaSignTransaction,
} from '@solana/wallet-standard-features';
import { Transaction, VersionedTransaction } from '@solana/web3.js';
import { ConnectOptions } from '@walless/core';
import Walless from '@walless/sdk';
import type { Wallet } from '@wallet-standard/base';
import {
	type StandardConnectFeature,
	type StandardConnectMethod,
	type StandardDisconnectFeature,
	type StandardDisconnectMethod,
	type StandardEventsFeature,
	type StandardEventsListeners,
	type StandardEventsNames,
	type StandardEventsOnMethod,
	StandardConnect,
	StandardConnectInput,
	StandardDisconnect,
	StandardEvents,
} from '@wallet-standard/features';
import { decode } from 'bs58';

import { WallessWalletAccount } from './account';
import { icon } from './icon';
import type { SolanaChain } from './solana';
import { isSolanaChain, SOLANA_CHAINS } from './solana';
import { bytesEqual } from './util';

export const WallessNamespace = 'walless:';

// Namespace for SUI
const SuiSignMessage = 'sui:signMessage';
const SuiSignTransactionBlock = 'sui:signTransactionBlock';
const SuiSignAndExecuteTransactionBlock = 'sui:signAndExecuteTransactionBlock';

export type WallessFeature = {
	[WallessNamespace]: {
		walless: Walless;
	};
};

export class WallessWallet implements Wallet {
	readonly #listeners: {
		[E in StandardEventsNames]?: StandardEventsListeners[E][];
	} = {};
	readonly #version = '1.0.0' as const;
	readonly #name = 'Walless' as const;
	readonly #icon = icon;
	#account: WallessWalletAccount | null = null;
	readonly #walless: Walless;

	get version() {
		return this.#version;
	}

	get name() {
		return this.#name;
	}

	get icon() {
		return this.#icon;
	}

	get chains() {
		return SOLANA_CHAINS.slice();
	}

	get features(): StandardConnectFeature &
		StandardDisconnectFeature &
		StandardEventsFeature &
		SolanaSignAndSendTransactionFeature &
		SolanaSignTransactionFeature &
		SolanaSignMessageFeature &
		SuiFeatures &
		WallessFeature {
		return {
			[StandardConnect]: {
				version: '1.0.0',
				connect: this.#connect,
			},
			[StandardDisconnect]: {
				version: '1.0.0',
				disconnect: this.#disconnect,
			},
			[StandardEvents]: {
				version: '1.0.0',
				on: this.#on,
			},
			[SolanaSignAndSendTransaction]: {
				version: '1.0.0',
				supportedTransactionVersions: ['legacy', 0],
				signAndSendTransaction: this.#signAndSendTransactionOnSolana,
			},
			[SolanaSignTransaction]: {
				version: '1.0.0',
				supportedTransactionVersions: ['legacy', 0],
				signTransaction: this.#signTransactionOnSolana,
			},
			[SolanaSignMessage]: {
				version: '1.0.0',
				signMessage: this.#signMessageOnSolana,
			},
			[SuiSignMessage]: {
				version: '1.0.0',
				signMessage: this.#signMessageOnSui,
			},
			[SuiSignTransactionBlock]: {
				version: '1.0.0',
				signTransactionBlock: this.#signTransactionBlockOnSui,
			},
			[SuiSignAndExecuteTransactionBlock]: {
				version: '1.0.0',
				signAndExecuteTransactionBlock:
					this.#signAndExecuteTransactionBlockOnSui,
			},
			[WallessNamespace]: {
				walless: this.#walless,
			},
		};
	}

	get accounts() {
		return this.#account ? [this.#account] : [];
	}

	constructor(walless: Walless) {
		// TODO: un-comment following
		// if (new.target === WallessWallet) {
		// 	Object.freeze(this);
		// }

		this.#walless = walless;

		walless.on('connect', this.#connected, this);
		walless.on('disconnect', this.#disconnected, this);
		walless.on('accountChanged', this.#reconnected, this);

		this.#connected();
	}

	#on: StandardEventsOnMethod = (event, listener) => {
		this.#listeners[event]?.push(listener) ||
			(this.#listeners[event] = [listener]);
		return (): void => this.#off(event, listener);
	};

	#emit<E extends StandardEventsNames>(
		event: E,
		...args: Parameters<StandardEventsListeners[E]>
	): void {
		// eslint-disable-next-line prefer-spread
		this.#listeners[event]?.forEach((listener) => listener.apply(null, args));
	}

	#off<E extends StandardEventsNames>(
		event: E,
		listener: StandardEventsListeners[E],
	): void {
		this.#listeners[event] = this.#listeners[event]?.filter(
			(existingListener) => listener !== existingListener,
		);
	}

	#connected = () => {
		const address = this.#walless.publicKey?.toBase58();

		if (address) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const publicKey = this.#walless.publicKey!.toBytes();

			const account = this.#account;
			if (
				!account ||
				account.address !== address ||
				!bytesEqual(account.publicKey, publicKey)
			) {
				this.#account = new WallessWalletAccount({ address, publicKey });
				this.#emit('change', { accounts: this.accounts });
			}
		}
	};

	#disconnected = () => {
		if (this.#account) {
			this.#account = null;
			this.#emit('change', { accounts: this.accounts });
		}
	};

	#reconnected = () => {
		if (this.#walless.publicKey) {
			this.#connected();
		} else {
			this.#disconnected();
		}
	};

	#connect: StandardConnectMethod = async (
		input: StandardConnectInput | undefined,
	) => {
		const { silent } = input ? input : { silent: false };

		if (!this.#account) {
			await this.#walless.connect(
				(silent ? { onlyIfTrusted: true } : undefined) as ConnectOptions,
			);
		}

		this.#connected();

		return { accounts: this.accounts };
	};

	#disconnect: StandardDisconnectMethod = async () => {
		await this.#walless.disconnect();
	};

	#signAndSendTransactionOnSolana: SolanaSignAndSendTransactionMethod = async (
		...inputs
	) => {
		if (!this.#account) throw new Error('not connected');

		const outputs: SolanaSignAndSendTransactionOutput[] = [];

		if (inputs.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { transaction, account, chain, options } = inputs[0]!;
			const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } =
				options || {};
			if (account !== this.#account) throw new Error('invalid account');
			if (!isSolanaChain(chain)) throw new Error('invalid chain');

			const { signature } = await this.#walless.signAndSendTransaction(
				VersionedTransaction.deserialize(transaction),
				{
					preflightCommitment,
					minContextSlot,
					maxRetries,
					skipPreflight,
				},
			);

			outputs.push({ signature: decode(signature) });
		} else if (inputs.length > 1) {
			for (const input of inputs) {
				outputs.push(...(await this.#signAndSendTransactionOnSolana(input)));
			}
		}

		return outputs;
	};

	#signTransactionOnSolana: SolanaSignTransactionMethod = async (...inputs) => {
		if (!this.#account) throw new Error('not connected');

		const outputs: SolanaSignTransactionOutput[] = [];

		if (inputs.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { transaction, account, chain } = inputs[0]!;
			if (account !== this.#account) throw new Error('invalid account');
			if (chain && !isSolanaChain(chain)) throw new Error('invalid chain');

			const signedTransaction = await this.#walless.signTransaction(
				VersionedTransaction.deserialize(transaction),
			);

			outputs.push({ signedTransaction: signedTransaction.serialize() });
		} else if (inputs.length > 1) {
			let chain: SolanaChain | undefined = undefined;
			for (const input of inputs) {
				if (input.account !== this.#account) throw new Error('invalid account');
				if (input.chain) {
					if (!isSolanaChain(input.chain)) throw new Error('invalid chain');
					if (chain) {
						if (input.chain !== chain) throw new Error('conflicting chain');
					} else {
						chain = input.chain;
					}
				}
			}

			const transactions = inputs.map(({ transaction }) =>
				Transaction.from(transaction),
			);

			const signedTransactions = await this.#walless.signAllTransactions(
				transactions,
			);

			outputs.push(
				...signedTransactions.map((signedTransaction) => ({
					signedTransaction: signedTransaction.serialize(),
				})),
			);
		}

		return outputs;
	};

	#signMessageOnSolana: SolanaSignMessageMethod = async (...inputs) => {
		if (!this.#account) throw new Error('not connected');

		const outputs: SolanaSignMessageOutput[] = [];

		if (inputs.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { message, account } = inputs[0]!;
			if (account !== this.#account) throw new Error('invalid account');

			const { signature } = await this.#walless.signMessage(message);

			outputs.push({ signedMessage: message, signature });
		} else if (inputs.length > 1) {
			for (const input of inputs) {
				outputs.push(...(await this.#signMessageOnSolana(input)));
			}
		}

		return outputs;
	};

	#signMessageOnSui: SuiSignMessageMethod = (input: SuiSignMessageInput) => {
		console.log(input);
		return null as never;
	};

	#signTransactionBlockOnSui: SuiSignTransactionBlockMethod = () => {
		// Your wallet's implementation
		return null as never;
	};

	#signAndExecuteTransactionBlockOnSui: SuiSignAndExecuteTransactionBlockMethod =
		() => {
			// Your wallet's implementation
			return null as never;
		};
}
