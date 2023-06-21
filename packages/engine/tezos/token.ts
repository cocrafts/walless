import { type TezosToolkit } from '@taquito/taquito';
import { type Endpoint, Networks } from '@walless/core';
import { type TokenDocument } from '@walless/store';

import { type GetTezosMetadataFunction, getTezosMetadata } from './metadata';
import { tezosEndpoints } from './pool';

interface TokenByAddressOption {
	endpoint: Endpoint;
	connection: TezosToolkit;
	address: string;
	metadataFetcher?: GetTezosMetadataFunction;
}

export const tezosTokensByAddress = async ({
	endpoint,
	connection,
	address,
	metadataFetcher = getTezosMetadata,
}: TokenByAddressOption): Promise<TokenDocument[]> => {
	const tokens: TokenDocument[] = [];
	const tezos = connection;

	if (endpoint == tezosEndpoints.tezosMainnet) {
		tokens.push(
			tezosNativeToken,
			...KNOWN_TEZOS_MAINNET_TOKENS.map((token) => {
				return {
					...token,
					_id: `${token.account.address}`,
					type: 'Token',
					network: Networks.tezos,
				} as TokenDocument;
			}),
		);
	} else if (endpoint == tezosEndpoints.ghostnetTestnet) {
		tokens.push(
			tezosNativeToken,
			...KNOWN_TEZOS_MAINNET_TOKENS.map((token) => {
				return {
					...token,
					_id: `${token.account.address}`,
					type: 'Token',
					network: Networks.tezos,
				} as TokenDocument;
			}),
		);
	} else {
		// These params used to fetch unknown tokens
		console.log({ connection, address, metadataFetcher });
	}

	return await Promise.all(
		tokens.map((token) => updateTokenBalance(token, tezos, address)),
	);
};

const updateTokenBalance = async (
	token: TokenDocument,
	tezos: TezosToolkit,
	address: string,
) => {
	try {
		if (token._id === 'tezos-native-token') {
			token.account.balance = (await tezos.tz.getBalance(address))
				.toNumber()
				.toString();
		} else {
			// Not handle yet
		}
	} catch {
		console.log(`Fetch balance of ${token.metadata?.symbol} failed`);
	}
	return token;
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
