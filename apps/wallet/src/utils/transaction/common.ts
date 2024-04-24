import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { TxnBuilderTypes } from 'aptos';
import { capitalize } from 'lodash';
import assets from 'utils/assets';

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return null;
		} else if (network == Networks.sui) {
			if (isValidSuiAddress(keyStr)) {
				return null;
			} else throw new Error();
		} else if (network == Networks.tezos) {
			return null;
		} else if (network == Networks.aptos) {
			const { AccountAddress } = TxnBuilderTypes;
			if (AccountAddress.isValid(keyStr)) {
				return null;
			} else throw new Error();
		}

		return null;
	} catch {
		return `Wrong [${capitalize(network)}] wallet address. Please check again.`;
	}
};

export const getNetworkMetadata = (network: Networks) => {
	let networkIcon;
	let networkName = '';
	let nativeSymbol = '';
	if (network == Networks.solana) {
		networkIcon = assets.widget.solana.storeMeta.iconUri;
		networkName = 'Solana';
		nativeSymbol = 'SOL';
	} else if (network == Networks.sui) {
		networkIcon = assets.widget.sui.storeMeta.iconUri;
		networkName = 'SUI';
		nativeSymbol = 'SUI';
	} else if (network == Networks.tezos) {
		networkIcon = assets.widget.tezos.storeMeta.iconUri;
		networkName = 'Tezos';
		nativeSymbol = 'TEZ';
	} else if (network === Networks.aptos) {
		networkIcon = assets.widget.aptos.storeMeta.iconUri;
		networkName = 'Aptos';
		nativeSymbol = 'APT';
	}

	return { networkIcon, networkName, nativeSymbol };
};

export const isNativeToken = (
	network: Networks,
	tokenSymbol?: string,
): boolean => {
	// NOTE: it is better to verify the symbol using network's sdk
	switch (network) {
		case Networks.solana:
			return tokenSymbol === 'SOL';
		case Networks.sui:
			return tokenSymbol === 'SUI';
		case Networks.aptos:
			return tokenSymbol === 'APT';
		case Networks.tezos:
			return tokenSymbol === 'XTZ';
		default:
			return false;
	}
};
