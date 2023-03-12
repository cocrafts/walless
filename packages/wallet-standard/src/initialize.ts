import { registerWallet } from './register.js';
import { WallessWallet } from './wallet.js';
import type { Walless } from './window.js';

export function initialize(walless: Walless): void {
	registerWallet(new WallessWallet(walless));
}
