import type { AccountInfo, ParsedAccountData } from '@solana/web3.js';
import type { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getMetadata, solMetadata, solMint } from './metadata';
import type { SolanaContext } from './shared';
import { throttle } from './shared';

export const getNativeTokenDocument = async (
	{ connection, endpoint }: SolanaContext,
	key: PublicKey,
): Promise<TokenDocument> => {
	const address = key.toString();
	const balance = await throttle(() => connection.getBalance(key))();

	return {
		_id: `${address}/${solMint}`,
		network: Networks.solana,
		endpoint,
		type: 'Token',
		account: {
			mint: solMint,
			owner: 'system',
			address,
			balance: String(balance),
			decimals: 9,
		},
		metadata: solMetadata,
	} satisfies TokenDocument;
};

export const getSPLTokenDocument = async (
	context: SolanaContext,
	key: PublicKey,
	account: AccountInfo<ParsedAccountData>,
    ownerPubkey: PublicKey,
): Promise<TokenDocument> => {
    const owner = ownerPubkey.toString();
	const address = key.toString();
	const { data } = account;
	const info = data.parsed?.info || {};
	const metadata = await getMetadata(context, info.mint);

	return {
		_id: `${owner}/${info.mint}`,
		network: Networks.solana,
		endpoint: context.endpoint,
		type: 'Token',
		account: {
			mint: info.mint,
			owner: owner.toString(),
			address,
			balance: info.tokenAmount?.amount,
			decimals: info.tokenAmount?.decimals,
		},
		metadata: metadata,
	};
};
