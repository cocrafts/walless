import { useMemo } from 'react';
import { Networks } from '@walless/core';
import { PublicKeyDocument } from '@walless/store';
import { tokenState } from 'state/tokens';
import { walletState } from 'state/wallet';
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
