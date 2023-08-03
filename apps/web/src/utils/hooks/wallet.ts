import { useMemo } from 'react';
import type { Networks } from '@walless/core';
import {
	collectiblesState,
	collectionsState,
	tokenState,
	walletState,
} from '@walless/engine';
import { historyState } from '@walless/engine/state/history/internal';
import type { PublicKeyDocument } from '@walless/store';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

export const usePublicKeys = (network?: Networks): PublicKeyDocument[] => {
	const { map } = useSnapshot(walletState);
	const keys = Array.from(map.values());

	return useMemo(() => {
		if (network) {
			return keys.filter((i) => {
				return i.network === network;
			});
		}

		return keys;
	}, [map, network]);
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
	const collectiblesMap = useSnapshot(collectiblesState).map;
	const collectionsMap = useSnapshot(collectionsState).map;

	return {
		collections: useMemo(() => {
			const collections = Array.from(collectionsMap.values()).filter(
				(ele) => ele.count > 0,
			);

			if (!network) return collections;
			else
				return collections.filter(
					(ele) =>
						ele.network === network &&
						ele._id.includes(address || '') &&
						ele.count > 0,
				);
		}, [collectionsMap, network, address]),

		collectibles: useMemo(() => {
			const collectibles = Array.from(collectiblesMap.values()).filter(
				(ele) => ele.account.amount > 0,
			);

			if (!network) return collectibles;
			else
				return collectibles.filter(
					(ele) => ele.network === network && ele._id.includes(address || ''),
				);
		}, [collectiblesMap, network, address]),
	};
};

export const useSettings = () => {
	const { config } = useSnapshot(appState);
	const { setPrivacy, setPathname } = appActions;

	return {
		setting: config,
		setPrivacy,
		setPathname,
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
