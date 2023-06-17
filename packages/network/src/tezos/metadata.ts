import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import { type UnknownObject, Networks } from '@walless/core';
import { type MetadataDocument, type TokenDocument } from '@walless/store';

const connection = new TezosToolkit('https://uoi3x99n7c.tezosrpc.midl.dev');

export type GetTezosMetadataFunction = (
	contractAddress: string,
	tokenId?: number,
) => Promise<MetadataDocument>;

/**
 * This method might be useful for manual importing token address
 * */
export const getTezosMetadata: GetTezosMetadataFunction = async (
	contractAddress,
	tokenId = 0,
) => {
	let token: Omit<TokenDocument, '_id' | 'type' | 'network'> | undefined;

	if (contractAddress == 'tez') {
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

	const contract = await connection.contract.at(
		contractAddress,
		compose(tzip12, tzip16),
	);

	const metadata = await contract.tzip12().getTokenMetadata(tokenId);

	return {
		_id: `${contractAddress}/${tokenId}`,
		name: metadata.name,
		symbol: metadata.symbol,
		imageUri: (metadata as UnknownObject)['thumbnailUri'],
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
		symbol: 'TEZ',
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
