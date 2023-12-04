import { useMemo } from 'react';
import type { Networks } from '@walless/core';
import {
	appState,
	collectibleState,
	collectionState,
	historyState,
	keyState,
	tokenState,
	widgetState,
} from '@walless/engine';
import type { PublicKeyDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import { universalActions } from '../../state';

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
				console.log([...widget.networks], key.network);
				return widget.networks?.indexOf(key.network) >= 0;
			});
		});
	}, [keyMap, widgetMap]);
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

		for (const item of tokens) {
			const isNetworkValid = network ? item.network === network : true;
			const isAccountValid = address ? item.account?.address === address : true;

			if (isNetworkValid && isAccountValid) {
				const { quotes, balance, decimals } = item.account;
				const quote = quotes?.[currency] || 0;

				valuation += quote * (parseInt(balance) / Math.pow(10, decimals));
				filteredTokens.push(item);
			}
		}

		return {
			tokens: filteredTokens,
			valuation,
		};
	}, [map, network, address]);
};

export const useNfts = (network?: Networks, address?: string) => {
	const collectibleMap = useSnapshot(collectibleState).map;
	const collectionMap = useSnapshot(collectionState).map;

	return {
		collections: useMemo(() => {
			const collections = Array.from(collectionMap.values()).filter(
				(ele) => ele.count > 0,
			);

			if (!network) return collections;
			else
				return collections.filter(
					(ele) => ele.network === network && ele._id.includes(address || ''),
				);
		}, [collectionMap, network, address]),

		collectibles: useMemo(() => {
			const collectibles = Array.from(collectibleMap.values()).filter(
				(ele) => ele.account.amount > 0,
			);

			if (!network) return collectibles;
			else
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

		return filteredHistory;
	}, [map, network, address]);
};

export const useSettings = () => {
	const { config } = useSnapshot(appState);

	return {
		setting: config,
		setPrivacy: universalActions.setPrivacy,
		setPathname: universalActions.setPathname,
	};
};
