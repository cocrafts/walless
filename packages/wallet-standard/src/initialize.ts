import type { Walless } from '@walless/sdk';

import { registerWallet } from './register';
import { WallessWallet } from './wallet';

export function initialize(walless: Walless): void {
	registerWallet(new WallessWallet(walless));
}
