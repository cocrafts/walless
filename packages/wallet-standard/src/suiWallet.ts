import { Ed25519PublicKey } from '@mysten/sui.js/keypairs/ed25519';
import type {
	SuiFeatures,
	SuiSignAndExecuteTransactionBlockMethod,
	SuiSignPersonalMessageMethod,
	SuiSignTransactionBlockMethod,
} from '@mysten/wallet-standard';
import { SUI_CHAINS } from '@mysten/wallet-standard';
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

import { SuiWalletAccount } from './account';
import { icon } from './icon';
import {
	SuiSignAndExecuteTransactionBlock,
	SuiSignPersonalMessage,
	SuiSignTransactionBlock,
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

export class SuiWallessWallet implements Wallet {
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
		return SUI_CHAINS.slice();
	}

	get features(): StandardConnectFeature &
		StandardDisconnectFeature &
		StandardEventsFeature &
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
			[SuiSignPersonalMessage]: {
				version: '1.0.0',
				signPersonalMessage: this.#signPersonalMessageOnSui,
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
					case Networks.sui: {
						const suiPublicKey = new Ed25519PublicKey(publicKey);

						return new SuiWalletAccount({
							address: suiPublicKey.toSuiAddress(),
							publicKey: suiPublicKey.toRawBytes(),
						});
					}
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
		console.log('connect successfully');

		this.#connected();

		return { accounts: this.accounts || [] };
	};

	#disconnect: StandardDisconnectMethod = async () => {
		await this.#walless.disconnect();
	};

	#signPersonalMessageOnSui: SuiSignPersonalMessageMethod = async (input) => {
		const { message, account } = input;
		const accountIndex = this.#accounts.findIndex(
			(acc) => acc.address === account.address,
		);
		if (accountIndex === -1) throw new Error('invalid account');

		const signedMessage = await this.#walless.signMessageOnSui(message);

		return signedMessage;
	};

	#signTransactionBlockOnSui: SuiSignTransactionBlockMethod = async (input) => {
		const { transactionBlock, account } = input;
		const accountIndex = this.#accounts.findIndex(
			(acc) => acc.address === account.address,
		);
		if (accountIndex === -1) throw new Error('invalid account');

		const signedTransaction = await this.#walless.signTransactionBlockOnSui(
			transactionBlock as never,
		);

		return signedTransaction as never;
	};

	#signAndExecuteTransactionBlockOnSui: SuiSignAndExecuteTransactionBlockMethod =
		async (input) => {
			const { transactionBlock, account, options } = input;
			const accountIndex = this.#accounts.findIndex(
				(acc) => acc.address === account.address,
			);
			if (accountIndex === -1) throw new Error('invalid account');

			const signedTransaction =
				await this.#walless.signAndExecuteTransactionBlock(
					transactionBlock as never,
					options,
				);

			return signedTransaction;
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
