import type {
	CustomWalletMetadata,
	SolanaToken,
	SuiToken,
} from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocument, WidgetDocument } from '@walless/store';
import { nftState, tokenState } from 'state/assets';

export type WidgetFilter = (widget: WidgetDocument) => boolean;

import { appState } from 'state/app';

import { solMint, SUI_COIN_TYPE, wrappedSolMint } from './constants';

const getTokenAddress = (token: TokenDocument) => {
	let id = '';
	if (token.network === Networks.solana) {
		id = getSolanaMintAddress((token as TokenDocument<SolanaToken>).mint);
	} else if (token.network === Networks.sui) {
		id = (token as TokenDocument<SuiToken>).coinObjectIds[0];
	}

	return id;
};

const getOwnedTokens = (network?: Networks, address?: string) => {
	const { map } = tokenState;

	const tokens = Array.from(map.values()).filter((token) => {
		const isInNetwork = network ? token.network === network : true;
		const isOwnedByAddress = address ? token.owner === address : true;
		return isInNetwork && isOwnedByAddress;
	});

	switch (network) {
		case Networks.solana: {
			const filteredTokens = [];
			for (const token of tokens as TokenDocument<SolanaToken>[]) {
				const isNetworkValid = network ? token.network === network : true;
				const isAvailable = token.amount !== '0';
				const isSol = token.mint === solMint;

				if (isNetworkValid && (isSol || isAvailable)) {
					filteredTokens.push(token);
				}
			}

			return filteredTokens;
		}
		case Networks.sui: {
			const filteredTokens = [];
			for (const token of tokens as TokenDocument<SuiToken>[]) {
				const isNetworkValid = network ? token.network === network : true;
				const isAvailable = token.balance !== 0;
				const isSUI = token.coinType === SUI_COIN_TYPE;

				if (isNetworkValid && (isSUI || isAvailable)) {
					filteredTokens.push(token);
				}
			}

			return filteredTokens;
		}
		case Networks.tezos: {
			return tokens;
		}
		case Networks.aptos: {
			return tokens;
		}
		default: {
			return tokens;
		}
	}
};

const getOwnedNfts = (network?: Networks, address?: string) => {
	const { map } = nftState;

	const nfts = Array.from(map.values()).filter((nft) => {
		const isInNetwork = network ? nft.network === network : true;
		const isOwnedByAddress = address ? nft.owner === address : true;
		const isAvailable = nft.amount > 0;

		return isInNetwork && isOwnedByAddress && isAvailable;
	});

	return nfts;
};

export const filterByOwnedTokens = (widget: WidgetDocument) => {
	const ownedTokens = getOwnedTokens(
		(widget.metadata as CustomWalletMetadata)?.network,
	);
	const requiredTokens = (widget.metadata as CustomWalletMetadata)?.tokens;
	const filteredTokens = ownedTokens.filter((ownedToken) => {
		const id = getTokenAddress(ownedToken);
		return requiredTokens?.[id];
	});

	return filteredTokens;
};

export const explorerFilterByTokenBalances = (widget: WidgetDocument) => {
	const tokens = filterByOwnedTokens(widget);
	const requiredTokens = (widget.metadata as CustomWalletMetadata)?.tokens;

	const filteredTokens = tokens.filter((token) => {
		const id = getTokenAddress(token as TokenDocument);
		const requiredToken = requiredTokens?.[id];

		return (
			requiredToken?.amount !== undefined &&
			(token as TokenDocument).balance >= requiredToken?.amount
		);
	});

	return filteredTokens.length > 0;
};

export const filterByOwnedNfts = (widget: WidgetDocument) => {
	const ownedNfts = getOwnedNfts(
		(widget.metadata as CustomWalletMetadata)?.network,
	);
	const requiredNfts = (widget.metadata as CustomWalletMetadata)?.nfts;

	const filteredNfts = ownedNfts.filter((ownedNft) => {
		const splittedStrings = ownedNft.collectionId?.split('/') || [];
		const id = splittedStrings[2] || '';
		return requiredNfts?.[id];
	});

	return filteredNfts;
};

export const explorerFilterByUserWhitelist = (widget: WidgetDocument) => {
	const whitelist = (widget.metadata as CustomWalletMetadata).whitelist;
	return whitelist.includes(appState.profile.email || '');
};

export const explorerFilterByOwnedNfts = (widget: WidgetDocument) => {
	return filterByOwnedNfts(widget).length > 0;
};

const getSolanaMintAddress = (mint: string) => {
	if (mint === solMint) {
		return wrappedSolMint;
	}

	return mint;
};

export const filterMap: Record<string, WidgetFilter[]> = {
	samo: [
		explorerFilterByTokenBalances,
		explorerFilterByOwnedNfts,
		explorerFilterByUserWhitelist,
	],
};
