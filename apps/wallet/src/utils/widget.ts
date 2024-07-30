import type {
	SolanaCollectible,
	SolanaToken,
	SuiNft,
	SuiToken,
} from '@walless/core';
import type { CustomWalletAssets, Nft, Token } from '@walless/core';
import { Networks } from '@walless/core';
import type { NftDocument, TokenDocument } from '@walless/store';

import { solMint, wrappedSolMint } from './constants';

export const filterAssetsFromCustomWalletTokens = (
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
					let id = '';
					if (nft.network === Networks.solana) {
						id = (nft as NftDocument<SolanaCollectible>).mint;
					} else if (nft.network === Networks.sui) {
						id = (nft as NftDocument<SuiNft>).objectId;
					}

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

const getSolanaMintAddress = (mint: string) => {
	if (mint === wrappedSolMint) {
		return solMint;
	}

	return mint;
};
