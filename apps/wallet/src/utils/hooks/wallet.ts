import { useMemo } from 'react';
import type { Networks } from '@walless/core';
import type {
	CollectibleDocument,
	PublicKeyDocument,
	TokenDocument,
} from '@walless/store';
import { appState } from 'state/app';
import { collectibleState, collectionState, tokenState } from 'state/assets';
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

const getTokenValue = (token: TokenDocument, currency: string) => {
	const { quotes, balance, decimals } = token.account;
	const quote = quotes?.[currency] || 0;

	return quote * (parseInt(balance) / Math.pow(10, decimals));
};

export const useTokens = (
	network?: Networks,
	address?: string,
	currency = 'usd',
) => {
	const { map } = useSnapshot(tokenState);
	const tokens = Array.from(map.values());

	return useMemo(() => {
		let valuation = 0;
		const filteredTokens = [];

		for (const token of tokens) {
			const isNetworkValid = network ? token.network === network : true;
			const isAccountValid = address
				? token.account?.address === address
				: true;
			const isAvailable = token.account.balance !== '0';
			const isSol = token.account.mint === solMint;

			if (isNetworkValid && isAccountValid && (isSol || isAvailable)) {
				valuation += getTokenValue(token, currency);
				filteredTokens.push(token);
			}
		}

		filteredTokens.sort((token1, token2) => {
			if (token1.account.mint === solMint) {
				return -1;
			} else if (token2.account.mint === solMint) {
				return 1;
			} else if (
				getTokenValue(token1, currency) < getTokenValue(token2, currency)
			) {
				return 1;
			} else {
				return -1;
			}
		});

		return {
			tokens: filteredTokens,
			valuation,
		};
	}, [map, network, address]);
};

export type WrappedCollection = CollectibleDocument & {
	count: number;
};

export const useNfts = (network?: Networks, address?: string) => {
	const collectibleMap = useSnapshot(collectibleState).map;
	const collectionMap = useSnapshot(collectionState).map;

	return {
		collections: useMemo(() => {
			const collectibles = Array.from(collectibleMap.values());
			const collections = Array.from(collectionMap.values())
				.map((ele) => {
					const count = collectibles.reduce((prev, cur) => {
						return (
							prev +
							(cur.collectionId === ele._id && cur.account.amount > 0 ? 1 : 0)
						);
					}, 0);

					return { ...ele, count } as WrappedCollection;
				})
				.filter((ele) => ele.count > 0);

			if (!network) return collections;

			return collections.filter(
				(ele) => ele.network === network && ele._id.includes(address || ''),
			);
		}, [collectionMap, collectibleMap, network, address]),

		collectibles: useMemo(() => {
			const collectibles = Array.from(collectibleMap.values()).filter(
				(ele) => ele.account.amount > 0,
			);

			if (!network) return collectibles;

			return collectibles.filter(
				(ele) => ele.network === network && ele._id.includes(address || ''),
			);
		}, [collectibleMap, network, address]),
	};
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
