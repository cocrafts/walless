import { SolanaWalless } from '@walless/provider-solana';
import { initialize } from '@walless/wallet-standard';

const configureWalletStandard = async (): Promise<void> => {
	const walless = new SolanaWalless();

	try {
		Object.defineProperty(window, 'walless', { value: walless });
	} catch {
		console.warn('Could not define Walless, namespace already taken.');
	}

	initialize(walless);
};

(async () => {
	console.log('injection complete, initializing..');
	await configureWalletStandard();
	console.log('initialize complete.');
})();
