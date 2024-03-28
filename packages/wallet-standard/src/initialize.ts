import type { Walless } from '@walless/sdk';

import { registerWallet } from './register';
import { SuiWallessWallet } from './suiWallet';
import { WallessWallet as SolanaWallessWallet } from './wallet';

export function initialize(walless: Walless): void {
	registerWallet(new SolanaWallessWallet(walless));
	registerWallet(new SuiWallessWallet(walless));
}
