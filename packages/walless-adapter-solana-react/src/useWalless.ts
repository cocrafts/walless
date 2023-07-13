import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { installLayout } from '@walless/walless-adapter-solana-base';

export function useWalless() {
	const [isWallessConnected, setIsWallessConnected] = useState(false);
	const walletContext = useWallet();
	const extendMethods = { installLayout };
	const handleIsNotWalless = () => {
		throw new Error('only available to Walless wallet');
	};

	useEffect(() => {
		setIsWallessConnected(
			walletContext.wallet?.adapter.name.toLocaleLowerCase() === 'walless',
		);
	}, [walletContext]);

	useEffect(() => {
		if (!isWallessConnected) {
			for (const method in extendMethods) {
				extendMethods[method as keyof typeof extendMethods] =
					handleIsNotWalless;
			}
		}
	}, [isWallessConnected]);

	return {
		...walletContext,
		...extendMethods,
		isWallessConnected,
	};
}
