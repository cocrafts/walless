import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { installLayout } from '@walless/walless-adapter-solana-base';

export function useWalless() {
	const walletContext = useWallet();
	const extendMethods = { installLayout };
	const handleIsNotWalless = () => {
		throw new Error('only available to Walless wallet');
	};

	useEffect(() => {
		if (wallet?.adapter.name !== 'Walless') {
			for (const method in extendMethods) {
				extendMethods[method as keyof typeof extendMethods] =
					handleIsNotWalless;
			}
		}
	}, [wallet]);

	return {
		...walletContext,
		...extendMethods,
	};
}
