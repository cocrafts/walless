import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { Connection, PublicKey } from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import type { NetworkCluster, SolanaToken } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import { getTokenQuote } from 'utils/api';
import { solMint, wrappedSolMint } from 'utils/constants';
import { addTokenToStorage } from 'utils/storage';

import { throttle } from './internal';
import { getTokenMetadata, solMetadata } from './metadata';
import type { ParsedTokenAccountWithAddress } from './types';

export const queryTokens = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
	accounts: ParsedTokenAccountWithAddress[],
): Promise<TokenDocument<SolanaToken>[]> => {
	const nativeTokenPromise = getNativeTokenDocument(
		connection,
		cluster,
		wallet,
	).then(async (doc) => {
		const quotes = await getTokenQuote({
			address: wrappedSolMint,
			network: doc.network,
		});
		doc.quotes = quotes?.quotes;

		await addTokenToStorage(doc);
		return doc;
	});

	const splTokensPromises = accounts
		.filter((a) => a.tokenAmount.decimals !== 0)
		.map(async (account) => {
			const doc = await initTokenDocumentWithMetadata(
				connection,
				cluster,
				account,
			);

			const quotes = await getTokenQuote({
				address: doc.mint,
				network: doc.network,
			});
			doc.quotes = quotes?.quotes;

			await addTokenToStorage(doc);
			return doc;
		});

	return await Promise.all([nativeTokenPromise, ...splTokensPromises]);
};

const getNativeTokenDocument = async (
	connection: Connection,
	cluster: NetworkCluster,
	key: PublicKey,
): Promise<TokenDocument<SolanaToken>> => {
	const address = key.toString();
	const balance = await throttle(() => connection.getBalance(key))();

	return {
		_id: `${address}/token/${solMint}`,
		network: Networks.solana,
		cluster,
		type: 'Token',
		mint: solMint,
		owner: 'system',
		ata: address,
		balance: balance / LAMPORTS_PER_SOL,
		amount: balance.toString(),
		decimals: 9,
		...solMetadata,
	};
};

export const getParsedTokenAccountsByOwner = async (
	connection: Connection,
	ownerPubkey: PublicKey,
) => {
	const accounts = await throttle(() => {
		return connection.getParsedTokenAccountsByOwner(
			ownerPubkey,
			{ programId: TOKEN_PROGRAM_ID },
			'confirmed',
		);
	})();

	return accounts.value.map((ele) => {
		return {
			publicKey: ele.pubkey,
			...ele.account.data.parsed.info,
		} as ParsedTokenAccountWithAddress;
	});
};

export const initTokenDocumentWithMetadata = async (
	connection: Connection,
	cluster: NetworkCluster,
	account: ParsedTokenAccountWithAddress,
): Promise<TokenDocument<SolanaToken>> => {
	const metadata = (await getTokenMetadata(connection, account.mint)) || {
		name: 'Unknown',
		symbol: 'Unknown',
		image: '',
	};

	const amount = account.tokenAmount.amount;
	const decimals = account.tokenAmount.decimals;
	const balance =
		account.tokenAmount.uiAmount || Number(amount) / 10 ** decimals;

	return {
		_id: `${account.owner}/token/${account.mint}`,
		network: Networks.solana,
		cluster,
		type: 'Token',
		mint: account.mint,
		owner: account.owner,
		ata: account.publicKey.toString(),
		amount,
		decimals,
		balance,
		...metadata,
	};
};
