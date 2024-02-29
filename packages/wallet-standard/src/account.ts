import { SUI_CHAINS } from '@mysten/wallet-standard';
import {
	SolanaSignAndSendTransaction,
	SolanaSignMessage,
	SolanaSignTransaction,
} from '@solana/wallet-standard-features';
import type { WalletAccount } from '@wallet-standard/base';

import { SOLANA_CHAINS } from './solana';
import {
	SuiSignAndExecuteTransactionBlock,
	SuiSignPersonalMessage,
	SuiSignTransactionBlock,
} from './utils';

const solanaFeatures = [
	SolanaSignAndSendTransaction,
	SolanaSignTransaction,
	SolanaSignMessage,
] as const;

const suiFeatures = [
	SuiSignPersonalMessage,
	SuiSignTransactionBlock,
	SuiSignAndExecuteTransactionBlock,
] as const;

export class SolanaWalletAccount implements WalletAccount {
	readonly #address: WalletAccount['address'];
	readonly #publicKey: WalletAccount['publicKey'];
	readonly #chains: WalletAccount['chains'];
	readonly #features: WalletAccount['features'];
	readonly #label: WalletAccount['label'];
	readonly #icon: WalletAccount['icon'];

	get address() {
		return this.#address;
	}

	get publicKey() {
		return this.#publicKey.slice();
	}

	get chains() {
		return this.#chains.slice();
	}

	get features() {
		return this.#features.slice();
	}

	get label() {
		return this.#label;
	}

	get icon() {
		return this.#icon;
	}

	constructor({
		address,
		publicKey,
		label,
		icon,
	}: Omit<WalletAccount, 'chains' | 'features'>) {
		// TODO: un-comment bellowing
		// if (new.target === WallessWalletAccount) {
		// 	Object.freeze(this);
		// }

		this.#address = address;
		this.#publicKey = publicKey;
		this.#chains = SOLANA_CHAINS;
		this.#features = solanaFeatures;
		this.#label = label;
		this.#icon = icon;
	}
}

export class SuiWalletAccount implements WalletAccount {
	readonly #address: WalletAccount['address'];
	readonly #publicKey: WalletAccount['publicKey'];
	readonly #chains: WalletAccount['chains'];
	readonly #features: WalletAccount['features'];
	readonly #label: WalletAccount['label'];
	readonly #icon: WalletAccount['icon'];

	get address() {
		return this.#address;
	}

	get publicKey() {
		return this.#publicKey.slice();
	}

	get chains() {
		return this.#chains.slice();
	}

	get features() {
		return this.#features.slice();
	}

	get label() {
		return this.#label;
	}

	get icon() {
		return this.#icon;
	}

	constructor({
		address,
		publicKey,
		label,
		icon,
	}: Omit<WalletAccount, 'chains' | 'features'>) {
		// TODO: un-comment bellowing
		// if (new.target === WallessWalletAccount) {
		// 	Object.freeze(this);
		// }

		this.#address = address;
		this.#publicKey = publicKey;
		this.#chains = SUI_CHAINS;
		this.#features = suiFeatures;
		this.#label = label;
		this.#icon = icon;
	}
}
