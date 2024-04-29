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
import { Networks } from '@walless/core';
import type { ConnectOptions, Walless } from '@walless/sdk';
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
import { decode, encode } from 'bs58';

import { SolanaWalletAccount } from './account';
import { icon } from './icon';
import type { SolanaChain } from './solana';
import { isSolanaChain, SOLANA_CHAINS } from './solana';
import {
	WallessCheckInstalledLayout,
	WallessInstallLayout,
	WallessOpenLayoutPopup,
} from './utils';

export const WallessNamespace = 'walless:';

export type WallessFeature = {
	[WallessInstallLayout]: {
		version: string;
		installLayout: (id: string) => Promise<boolean>;
	};
	[WallessCheckInstalledLayout]: {
		version: string;
		checkInstalledLayout: (id: string) => Promise<boolean>;
	};
	[WallessOpenLayoutPopup]: {
		version: string;
		openLayoutPopup: (id: string) => Promise<boolean>;
	};
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
			[WallessInstallLayout]: {
				version: '1.0.0',
				installLayout: this.#installLayout,
			},
			[WallessCheckInstalledLayout]: {
				version: '1.0.0',
				checkInstalledLayout: this.#checkInstalledLayout,
			},
			[WallessOpenLayoutPopup]: {
				version: '1.0.0',
				openLayoutPopup: this.#openLayoutPopup,
			},
			[WallessNamespace]: {
				walless: this.#walless,
			},
		};
	}

	get accounts() {
		return this.#accounts;
	}

	constructor(walless: Walless) {
		Object.freeze(this);

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
		const publicKeys = this.#walless.publicKeys;
		if (!publicKeys) return;

		this.#accounts = publicKeys
			.map(({ publicKey, network }) => {
				switch (network) {
					case Networks.solana:
						return new SolanaWalletAccount({
							address: encode(publicKey),
							publicKey: publicKey,
						});
				}
			})
			.filter((a) => !!a) as WalletAccount[];

		this.#emit('change', { accounts: this.accounts });
	};

	#disconnected = () => {
		if (this.#accounts.length > 0) {
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
			const { transaction, account, chain, options } = inputs[0]!;
			if (!isSolanaChain(chain)) throw new Error('invalid chain');

			const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } =
				options || {};

			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');

			const { signature } = await this.#walless.signAndSendTransactionOnSolana(
				transaction,
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
			const { transaction, account, chain } = inputs[0]!;
			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');
			if (chain && !isSolanaChain(chain)) throw new Error('invalid chain');

			const signedTransaction =
				await this.#walless.signTransactionOnSolana(transaction);

			outputs.push({ signedTransaction });
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

			const transactions = inputs.map((i) => i.transaction);
			const txs = await this.#walless.signAllTransactionsOnSolana(transactions);

			outputs.push(...txs.map((signedTransaction) => ({ signedTransaction })));
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

	#installLayout = async (id: string) => {
		return await this.#walless.installLayout(id);
	};

	#checkInstalledLayout = async (id: string) => {
		return await this.#walless.checkInstalledLayout(id);
	};

	#openLayoutPopup = async (id: string) => {
		return await this.#walless.openLayoutPopup(id);
	};
}
