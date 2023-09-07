import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { WallessWalletAdapter } from '@walless/walless-adapter-solana-base';
import SEOHead from 'components/SEOHead';
import { type AppProps } from 'next/app';

import 'raf/polyfill';

import '../../public/reset.css';

// Set the Solana network (mainnet-beta, testnet, etc.)
const network = WalletAdapterNetwork.Devnet;

// Set the RPC endpoint based on the network
const endpoint = clusterApiUrl(network);

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRender] = useState({});

	/**
	 * This effect makes reanimated work
	 * */
	useEffect(function updateState() {
		setRender({});
	}, []);

	// Connection provider configuration
	const connectionConfig = useMemo(
		() => ({
			endpoint: endpoint,
			// Add other connection configuration properties if needed
		}),
		[endpoint],
	);

	return (
		<>
			<ConnectionProvider {...connectionConfig}>
				<WalletProvider wallets={[new WallessWalletAdapter()]} autoConnect>
					<SEOHead />
					<Component {...pageProps} />
				</WalletProvider>
			</ConnectionProvider>
		</>
	);
};

export default App;
