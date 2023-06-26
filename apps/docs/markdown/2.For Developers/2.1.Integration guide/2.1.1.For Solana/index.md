# Integration guide for Solana

## What is Wallet Standard?

The `Wallet Standard` is a set of interfaces and conventions designed to improve the user experience and developer experience of wallets and applications for any blockchain.

## What is Wallet Adapter?

There is a collection of libraries that can help bootstrap wallet connections within Solana called `Wallet Adapter`. Currently the package supports use within Svelte, Angular, Vue, and React. As `Wallet Adapter` already integrated Wallet Standard, any wallets with `Wallet Standard` built in will be detected automatically. `Wallet Adapter` can quick start your dApp integration with Walless.

## How to setup Wallet Adapter?

This is a quick setup guide with examples of how to add `Wallet Adapter` and connect wallet to a React-based Solana app:

1. Install `wallet-adapter` and `web3.js` libraries:

```yarn
    yarn add @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/web3.js
```

2. Setup Provider:

```tsx
import React, { FC, useMemo } from 'react';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

export const App: FC = () => {
	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	const network = WalletAdapterNetwork.Devnet;

	// You can also provide a custom RPC endpoint.

	const wallets = useMemo(
		() => [
			/**
			 * Wallets that implement either of these standards will be available automatically.
			 *
			 *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
			 *     (https://github.com/solana-mobile/mobile-wallet-adapter)
			 *   - Solana Wallet Standard
			 *     (https://github.com/solana-labs/wallet-standard)
			 *
			 * If you wish to support a wallet that supports neither of those standards,
			 * instantiate its legacy wallet adapter here. Common legacy adapters can be found
			 * in the npm package `@solana/wallet-adapter-wallets`.
			 */
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[network],
	);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				{/* Your app's components go here, nested within the context providers. */}
			</WalletProvider>
		</ConnectionProvider>
	);
};
```

3. Firstly, it’s necessary to have a place for user to select what wallet they want to connect. This is code snip to get a list of installed and support wallets to select:

```tsx
import type { FC } from 'react';
import type { WalletName } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';

export const WalletsList: FC = () => {
		const { wallets, select } = useWallet();
		const handleSelectWallet = (walletName: WalletName) => select(walletName);

		return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
						{wallets.map((wallet) =>
								<button key={wallet.adapter.name} onClick={() =>
										handleSelectWallet(wallet.adapter.name)}
								>
										{wallet.adapter.name}
								</button>
						)
				</div>
		);
};
```
