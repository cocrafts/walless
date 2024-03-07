import { useMemo } from 'react';
import type { SolanaToken } from '@walless/core';
import { Networks } from '@walless/core';
import type {
	CollectionDocumentV2,
	PublicKeyDocument,
	TokenDocumentV2,
} from '@walless/store';
import { appState } from 'state/app';
import { collectionState, nftState, tokenState } from 'state/assets';
import { historyState } from 'state/history';
import { keyState } from 'state/keys';
import { runtimeActions } from 'state/runtime';
import { widgetState } from 'state/widget';
import { solMint } from 'utils/constants';
import { useSnapshot } from 'valtio';

export const usePublicKeys = (network?: Networks): PublicKeyDocument[] => {
	const { map } = useSnapshot(keyState);

	return useMemo(() => {
		const keys = Array.from(map.values());

		if (network) {
			return keys.filter((i) => {
				return i.network === network;
			});
		}

		return keys;
	}, [map, network]);
};

export const useRelevantKeys = () => {
	const { map: keyMap } = useSnapshot(keyState);
	const { map: widgetMap } = useSnapshot(widgetState);

	return useMemo(() => {
		const keys = Array.from(keyMap.values());
		const widgets = Array.from(widgetMap.values());

		return keys.filter((key) => {
			return widgets.find((widget) => {
				return widget.networks?.indexOf(key.network) >= 0;
			});
		});
	}, [keyMap, widgetMap]);
};

const getTokenValue = (token: TokenDocumentV2, currency: string) => {
	const { quotes, balance } = token;
	const quote = quotes?.[currency] || 0;

	return quote * balance;
};

export const useTokens = (
	network?: Networks,
	address?: string,
	currency = 'usd',
) => {
	const { map } = useSnapshot(tokenState);

	return useMemo(() => {
		const tokens = Array.from(map.values()).filter((token) => {
			const isInNetwork = network ? token.network === network : true;
			const isOwnedByAddress = address ? token.owner === address : true;
			return isInNetwork && isOwnedByAddress;
		});

		let valuation = 0;
		let filteredTokens = [];

		switch (network) {
			case Networks.solana: {
				for (const token of tokens as TokenDocumentV2<SolanaToken>[]) {
					const isNetworkValid = network ? token.network === network : true;
					const isAvailable = token.amount !== '0';
					const isSol = token.mint === solMint;

					if (isNetworkValid && (isSol || isAvailable)) {
						valuation += getTokenValue(token, currency);
						filteredTokens.push(token);
					}
				}

				filteredTokens.sort((token1, token2) => {
					if (token1.mint === solMint) return -1;
					else if (token2.mint === solMint) return 1;
					else if (
						getTokenValue(token1, currency) < getTokenValue(token2, currency)
					)
						return 1;
					else return -1;
				});
				break;
			}
			default: {
				filteredTokens = tokens;
				break;
			}
		}

		return {
			tokens: filteredTokens,
			valuation,
		};
	}, [map, network, address]);
};

export type WrappedCollection = CollectionDocumentV2 & {
	count: number;
};

export const useNfts = (network?: Networks, address?: string) => {
	const NftMap = useSnapshot(nftState).map;
	const collectionMap = useSnapshot(collectionState).map;

	const nfts = useMemo(() => {
		return Array.from(NftMap.values()).filter((nft) => {
			const isInNetwork = network ? nft.network === network : true;
			const isOwnedByAddress = address ? nft.owner === address : true;
			const isAvailable = nft.amount > 0;

			return isInNetwork && isOwnedByAddress && isAvailable;
		});
	}, [NftMap, network, address]);

	const collections = useMemo(() => {
		return Array.from(collectionMap.values())
			.filter((collection) => {
				const isInNetwork = network ? collection.network === network : true;
				const isOwnedByAddress = address
					? collection._id.includes(address)
					: true;

				return isInNetwork && isOwnedByAddress;
			})
			.map((collection) => {
				const count = nfts.filter(
					(nft) => nft.collectionId === collection._id,
				).length;

				return { ...collection, count };
			});
	}, [collectionMap, nfts, network, address]);

	return { collections, nfts };
};

export const useHistory = (network?: Networks, address?: string) => {
	const { map } = useSnapshot(historyState);
	const history = Array.from(map.values());

	return useMemo(() => {
		const filteredHistory = [];
		for (const transaction of history) {
			const isNetworkValid = network ? transaction.network === network : true;
			const isAddressValid = address ? transaction.sender === address : true;

			if (isNetworkValid && isAddressValid) {
				filteredHistory.push(transaction);
			}
		}

		return filteredHistory.sort((history1, history2) =>
			history1.date > history2.date ? -1 : 1,
		);
	}, [map, network, address]);
};

export const useSettings = () => {
	const { config } = useSnapshot(appState);

	return {
		setting: config,
		setPrivacy: runtimeActions.setPrivacy,
	};
};
