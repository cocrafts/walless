import type { TezosToken } from '@walless/core';
import { NetworkClusters, Networks, TezosTokenTypes } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { convertTezosImageUriToUrl } from './utils';

export const constructTezosTokenDocument = (
	token: TezosToken,
): TokenDocument<TezosToken> => {
	let image = convertTezosImageUriToUrl(token.image);
	if (token.symbol === 'tzBTC') {
		image = 'https://tzbtc.io/wp-content/uploads/2020/03/tzbtc_logo_single.svg';
	}

	const tokenDocument = {
		_id: `${token.owner}/token/${token.contract.address}/${token.tokenId}`,
		type: 'Token',
		network: Networks.tezos,
		cluster: token.cluster,
		owner: token.owner,
		balance: token.balance,
		amount: token.amount,
		decimals: token.decimals,
		symbol: token.symbol,
		name: token.name,
		image: image,
		contract: token.contract,
		tokenType: token.tokenType,
		tokenId: token.tokenId,
	} as TokenDocument<TezosToken>;

	return tokenDocument;
};

export const XTZ = {
	tokenId: '0',
	network: Networks.tezos,
	owner: '',
	cluster: NetworkClusters.mainnet,
	balance: 0,
	amount: '0',
	decimals: 6,
	symbol: 'XTZ',
	name: 'XTZ',
	image: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2011.png',
	contract: {
		address: 'KT1VYsVfmobT7rsMVivvZ4J8i3bPiqz12NaH',
		alias: 'XTZ',
	},
	tokenType: TezosTokenTypes.FA12,
};
