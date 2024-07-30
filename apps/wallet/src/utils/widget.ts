import type { SolanaToken, SuiToken } from '@walless/core';
import type { CustomWalletAssets, Nft, Token } from '@walless/core';
import { Networks } from '@walless/core';
import type { NftDocument, TokenDocument } from '@walless/store';

import { solMint, wrappedSolMint } from './constants';

export const filterAssetsFromCustomWalletAssets = (
	requiredAssets: CustomWalletAssets[],
	{
		ownedTokens,
		ownedNfts,
	}: {
		ownedTokens?: TokenDocument<Token>[];
		ownedNfts?: NftDocument<Nft>[];
	},
) => {
	if (ownedNfts) {
		return ownedNfts.filter(
			(nft) =>
				requiredAssets?.some((ele) => {
					const splittedStrings = nft.collectionId?.split('/') || [];
					const id = splittedStrings[2] || '';

					return ele.mintAddress === id;
				}),
		);
	}

	if (ownedTokens) {
		return ownedTokens.filter(
			(token) =>
				requiredAssets?.some((ele) => {
					let id = '';
					if (token.network === Networks.solana) {
						id = getSolanaMintAddress(
							(token as TokenDocument<SolanaToken>).mint,
						);
					} else if (token.network === Networks.sui) {
						id = (token as TokenDocument<SuiToken>).coinObjectIds[0];
					}
					return ele.mintAddress === id;
				}),
		);
	}

	return [];
};

export const filterTokensWithAmountFromCustomWalletToken = (
	requiredAssets: CustomWalletAssets[],
	ownedTokens: TokenDocument<Token>[],
) => {
	return ownedTokens.filter(
		(token) =>
			requiredAssets?.some((ele) => {
				let id = '';
				if (token.network === Networks.solana) {
					id = getSolanaMintAddress((token as TokenDocument<SolanaToken>).mint);
				} else if (token.network === Networks.sui) {
					id = (token as TokenDocument<SuiToken>).coinObjectIds[0];
				}

				return (
					ele.mintAddress === id && ele.amount && ele.amount <= token.balance
				);
			}),
	);
};

const getSolanaMintAddress = (mint: string) => {
	if (mint === solMint) {
		return wrappedSolMint;
	}

	return mint;
};
