import type { Ed25519PublicKey } from '@mysten/sui.js';
import type {
	SuiFeatures,
	SuiSignAndExecuteTransactionBlockMethod,
	SuiSignMessageInput,
	SuiSignMessageMethod,
	SuiSignTransactionBlockMethod,
} from '@mysten/wallet-standard';
import type {
	SolanaSignAndSendTransactionFeature,
	SolanaSignAndSendTransactionMethod,
	SolanaSignAndSendTransactionOutput,
	SolanaSignMessageFeature,
	SolanaSignMessageMethod,
	SolanaSignMessageOutput,
	SolanaSignTransactionFeature,
	SolanaSignTransactionMethod,
	SolanaSignTransactionOutput,
} from '@solana/wallet-standard-features';
import {
	SolanaSignAndSendTransaction,
	SolanaSignMessage,
	SolanaSignTransaction,
} from '@solana/wallet-standard-features';
import { Transaction, VersionedTransaction } from '@solana/web3.js';
import type { ConnectOptions } from '@walless/core';
import { Networks } from '@walless/core';
import type Walless from '@walless/sdk';
import type { Wallet, WalletAccount } from '@wallet-standard/base';
import type {
	StandardConnectFeature,
	StandardConnectInput,
	StandardConnectMethod,
	StandardDisconnectFeature,
	StandardDisconnectMethod,
	StandardEventsFeature,
	StandardEventsListeners,
	StandardEventsNames,
	StandardEventsOnMethod,
} from '@wallet-standard/features';
import {
	StandardConnect,
	StandardDisconnect,
	StandardEvents,
} from '@wallet-standard/features';
import { decode } from 'bs58';

import { SolanaWalletAccount, SuiWalletAccount } from './account';
import { icon } from './icon';
import type { SolanaChain } from './solana';
import { isSolanaChain, SOLANA_CHAINS } from './solana';
import {
	SuiSignAndExecuteTransactionBlock,
	SuiSignMessage,
	SuiSignTransactionBlock,
} from './util';

export const WallessNamespace = 'walless:';

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
	// #account: WalletAccount | null = null;
	#accounts: WalletAccount[] = [];
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
		// return this.#account ? [this.#account] : [];
		return this.#accounts;
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
		const accounts = this.#walless.publicKeys;

		if (!accounts) {
			// throw Error('Accounts is null');
			return;
		}

		let solIdx = -1;

		this.#accounts = accounts.map(({ publicKey, network }, index) => {
			switch (network) {
				case Networks.solana:
					solIdx = index;
					return new SolanaWalletAccount({
						address: publicKey.toString(),
						publicKey: publicKey.toBytes(),
					});
				case Networks.sui:
					return new SuiWalletAccount({
						address: (publicKey as Ed25519PublicKey).toSuiAddress(),
						publicKey: publicKey.toBytes(),
					});
				default:
					return null;
			}
		}) as Array<SolanaWalletAccount | SuiWalletAccount>;

		// Move solana account to head of account list
		// Match with default Solana Wallet Adapter
		if (solIdx !== -1) {
			const solanaAccount = this.#accounts[solIdx];
			this.#accounts.splice(solIdx, 1);
			this.#accounts.unshift(solanaAccount);
		}

		this.#emit('change', { accounts: this.accounts });
	};

	#disconnected = () => {
		if (this.#accounts.length > 0) {
			// this.#account = null;
			this.#accounts = [];
			this.#emit('change', { accounts: this.accounts });
		}
	};

	#reconnected = () => {
		if (this.#walless.publicKeys) {
			this.#connected();
		} else {
			this.#disconnected();
		}
	};

	#connect: StandardConnectMethod = async (
		input: StandardConnectInput | undefined,
	) => {
		const { silent } = input ? input : { silent: false };

		if (this.#accounts.length === 0) {
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
		if (this.#accounts.length === 0) throw new Error('not connected');

		const outputs: SolanaSignAndSendTransactionOutput[] = [];

		if (inputs.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { transaction, account, chain, options } = inputs[0]!;
			const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } =
				options || {};
			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');
			if (!isSolanaChain(chain)) throw new Error('invalid chain');

			const { signature } = await this.#walless.signAndSendTransactionOnSolana(
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
		if (this.#accounts.length === 0) throw new Error('not connected');

		const outputs: SolanaSignTransactionOutput[] = [];

		if (inputs.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { transaction, account, chain } = inputs[0]!;
			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');
			if (chain && !isSolanaChain(chain)) throw new Error('invalid chain');

			const signedTransaction = await this.#walless.signTransactionOnSolana(
				VersionedTransaction.deserialize(transaction),
			);

			outputs.push({ signedTransaction: signedTransaction.serialize() });
		} else if (inputs.length > 1) {
			let chain: SolanaChain | undefined = undefined;
			for (const input of inputs) {
				const accountIndex = this.#accounts.findIndex(
					(acc) => acc.address === input.account.address,
				);
				if (accountIndex === -1) throw new Error('invalid account');
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

			const signedTransactions =
				await this.#walless.signAllTransactionsOnSolana(transactions);

			outputs.push(
				...signedTransactions.map((signedTransaction) => ({
					signedTransaction: signedTransaction.serialize(),
				})),
			);
		}

		return outputs;
	};

	#signMessageOnSolana: SolanaSignMessageMethod = async (...inputs) => {
		if (this.#accounts.length === 0) throw new Error('not connected');

		const outputs: SolanaSignMessageOutput[] = [];

		if (inputs.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { message, account } = inputs[0]!;
			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');

			const { signature } = await this.#walless.signMessageOnSolana(message);

			outputs.push({ signedMessage: message, signature });
		} else if (inputs.length > 1) {
			for (const input of inputs) {
				outputs.push(...(await this.#signMessageOnSolana(input)));
			}
		}

		return outputs;
	};

	#signMessageOnSui: SuiSignMessageMethod = async (
		input: SuiSignMessageInput,
	) => {
		const { message, account } = input;
		const accountIndex = this.#accounts.findIndex(
			(acc) => acc.address === account.address,
		);
		if (accountIndex === -1) throw new Error('invalid account');

		const signedMessage = await this.#walless.signMessageOnSui(message);

		return signedMessage;
	};

	#signTransactionBlockOnSui: SuiSignTransactionBlockMethod = async (input) => {
		const { transactionBlock, account, chain } = input;
		const accountIndex = this.#accounts.findIndex(
			(acc) => acc.address === account.address,
		);
		if (accountIndex === -1) throw new Error('invalid account');

		const signedTransaction = await this.#walless.signTransactionBlockOnSui(
			transactionBlock,
			chain,
		);

		return signedTransaction;
	};

	#signAndExecuteTransactionBlockOnSui: SuiSignAndExecuteTransactionBlockMethod =
		async (input) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { transactionBlock, account, chain, options, requestType } = input;
			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');

			const signedTransaction =
				await this.#walless.signAndExecuteTransactionBlock(
					transactionBlock,
					options,
				);

			return signedTransaction;
		};
}
