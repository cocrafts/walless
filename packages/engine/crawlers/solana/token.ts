import type { AccountInfo, ParsedAccountData } from '@solana/web3.js';
import type { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getTokenQuotes, makeHashId } from '../../utils/api';

import { getMetadata, solMetadata, solMint } from './metadata';
import type { SolanaContext } from './shared';
import {
	getTokenType,
	throttle,
	tokenProgramFilter,
	TokenType,
} from './shared';
import { registerAccountChanges, watchLogs } from './subscription';

export const getNativeTokenDocument = async (
	{ connection, endpoint }: SolanaContext,
	key: PublicKey,
): Promise<TokenDocument> => {
	const address = key.toString();
	const balance = await throttle(() => connection.getBalance(key))();

	return {
		_id: `${address}/token/${solMint}`,
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
		_id: `${owner}/token/${info.mint}`,
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

export const solanaFungiblesByAddress = async (
	context: SolanaContext,
	ownerPubkey: PublicKey,
) => {
	const { connection } = context;
	const accountKeys = [ownerPubkey];
	const fungiblePromises: Promise<TokenDocument>[] = [
		getNativeTokenDocument(context, ownerPubkey),
	];

	watchLogs(context, ownerPubkey);

	const parsedTokenAccounts = await throttle(() => {
		return connection.getParsedTokenAccountsByOwner(
			ownerPubkey,
			tokenProgramFilter,
			'confirmed',
		);
	})();

	for (const { pubkey, account } of parsedTokenAccounts.value) {
		const tokenType = getTokenType(account);

		if (tokenType === TokenType.Fungible) {
			fungiblePromises.push(
				getSPLTokenDocument(context, pubkey, account, ownerPubkey),
			);
		}

		accountKeys.push(pubkey);
	}

	const fungibleTokens = (await Promise.all(fungiblePromises)).filter(
		(token) => token.account.mint === solMint || token.account.balance !== '0',
	);
	const quotes = await getTokenQuotes(fungibleTokens);

	for (const item of fungibleTokens) {
		item.account.quotes = quotes[makeHashId(item)].quotes;
	}

	for (const key of accountKeys) {
		registerAccountChanges(context, key, ownerPubkey);
	}

	return fungibleTokens;
};
