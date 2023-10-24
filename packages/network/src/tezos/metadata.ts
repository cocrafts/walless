import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12, Tzip12Module } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import type { UnknownObject } from '@walless/core';
import { Networks } from '@walless/core';
import type { MetadataDocument, TokenDocument } from '@walless/store';

import { getURL } from '../utils/convert';

const connection = new TezosToolkit('https://uoi3x99n7c.tezosrpc.midl.dev');

connection.addExtension(new Tzip12Module());

export type GetTezosMetadataFunction = (
	contractAddress: string,
	tokenId?: number,
) => Promise<MetadataDocument | undefined>;

export const getTezosMetadata: GetTezosMetadataFunction = async (
	contractAddress,
	tokenId = 0,
) => {
	let token: Omit<TokenDocument, '_id' | 'type' | 'network'> | undefined;

	if (contractAddress == '0x16939ef78684453bfdfb47825f8a5f714f12623a') {
		token = tezosNativeToken;
	} else {
		token = KNOWN_TEZOS_MAINNET_TOKENS.find((token) => {
			return token.account.address === contractAddress;
		});
	}

	if (token) {
		return {
			_id: contractAddress,
			name: token.metadata?.name,
			symbol: token.metadata?.symbol,
			imageUri: token.metadata?.imageUri,
			type: 'Metadata',
		};
	}

	let metadata: UnknownObject;
	try {
		const contract = await connection.contract.at(
			contractAddress,
			compose(tzip12, tzip16),
		);
		metadata = await contract.tzip12().getTokenMetadata(tokenId);
	} catch (_) {
		return;
	}

	return {
		_id: `${contractAddress}`,
		name: metadata.name,
		symbol: metadata.symbol,
		imageUri: getURL(
			metadata.icon ||
				(metadata as UnknownObject)['displayUri'] ||
				(metadata as UnknownObject)['thumbnailUri'],
		),
		endpoint: connection.rpc.getRpcUrl(),
		type: 'Metadata',
	};
};

const tezosNativeToken: TokenDocument = {
	_id: 'tezos-native-token',
	network: Networks.tezos,
	type: 'Token',
	metadata: {
		name: 'Tezos',
		symbol: 'XTZ',
		imageUri: '/img/network/tezos-icon-sm.png',
	},
	account: {
		balance: '0',
		decimals: 6,
	},
};

const KNOWN_TEZOS_MAINNET_TOKENS: Omit<
	TokenDocument,
	'_id' | 'type' | 'network'
>[] = [
	{
		metadata: {
			name: 'Tether USD',
			symbol: 'USDt',
			imageUri:
				'https://ipfs.io/ipfs/QmRymVGWEudMfLrbjaEiXxngCRTDgWCsscjQMwizy4ZJjX',
		},
		account: {
			tokenId: 0,
			address: 'KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o',
			balance: '0',
			decimals: 6,
		},
	},
	{
		metadata: {
			name: 'youves uUSD',
			symbol: 'uUSD',
			imageUri:
				'https://ipfs.io/ipfs/QmbvhanNCxydZEbGu1RdqkG3LcpNGv7XYsCHgzWBXnmxRd',
		},
		account: {
			tokenId: 0,
			address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
			balance: '0',
			decimals: 12,
		},
	},
	{
		metadata: {
			name: 'Kolibri',
			symbol: 'kUSD',
			imageUri: 'https://kolibri-data.s3.amazonaws.com/logo.png',
		},
		account: {
			tokenId: 0,
			address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
			balance: '0',
			decimals: 18,
		},
	},
	{
		metadata: {
			name: 'Tezos BTC',
			symbol: 'tzBTC',
			imageUri:
				'https://tzbtc.io/wp-content/uploads/2020/03/tzbtc_logo_single.svg',
		},
		account: {
			tokenId: 0,
			address: 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
			balance: '0',
			decimals: 8,
		},
	},
	{
		metadata: {
			name: 'youves uBTC',
			symbol: 'uBTC',
			imageUri:
				'https://ipfs.io/ipfs/Qmbev41h4axBqVzxsXP2NSaAF996bJjJBPb8FFZVqTvJTY',
		},
		account: {
			tokenId: 2,
			address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
			balance: '0',
			decimals: 12,
		},
	},
	{
		metadata: {
			name: 'Quipuswap governance token',
			symbol: 'QUIPU',
			imageUri:
				'https://ipfs.io/ipfs/Qmb2GiHN9EjcrN29J6y9PsXu3ZDosXTv6uLUWGZfRRSzS2/quipu.png',
		},
		account: {
			tokenId: 0,
			address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
			balance: '0',
			decimals: 6,
		},
	},
	{
		metadata: {
			name: 'youves YOU Governance',
			symbol: 'YOU',
			imageUri:
				'https://ipfs.io/ipfs/QmYAJaJvEJuwvMEgRbBoAUKrTxRTT22nCC9RuY7Jy4L4Gc',
		},
		account: {
			tokenId: 0,
			address: 'KT1Xobej4mc6XgEjDoJoHtTKgbD1ELMvcQuL',
			balance: '0',
			decimals: 12,
		},
	},
];
