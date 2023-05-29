import { useMemo } from 'react';
import { type Networks } from '@walless/core';
import { tokenState, walletState } from '@walless/engine';
import { type PublicKeyDocument } from '@walless/store';
import { appState } from 'state/app';
import { settingsActions } from 'state/settings';
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

export const useTokens = (network?: Networks, address?: string) => {
	const { map } = useSnapshot(tokenState);
	const tokens = Array.from(map.values());

	return useMemo(() => {
		if (network || address) {
			return tokens.filter((i) => {
				const isNetworkValid = network ? i.network === network : true;
				const isAccountValid = address ? i.account?.address === address : true;

				return isNetworkValid && isAccountValid;
			});
		}

		return tokens;
	}, [map, network, address]);
};

export const useSettings = () => {
	const { settingConfig } = useSnapshot(appState);

	return {
		setting: settingConfig,
		setSetting: settingsActions,
	};
};
