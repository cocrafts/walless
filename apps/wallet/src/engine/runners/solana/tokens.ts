import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { PublicKey } from '@solana/web3.js';
import { type Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import type { NetworkCluster, SolanaToken } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocumentV2 } from '@walless/store';
import { getTokenQuotes, makeHashId } from 'utils/api';
import { solMint } from 'utils/constants';

import { throttle } from './internal';
import { getTokenMetadata, solMetadata } from './metadata';
import type { ParsedTokenAccountWithAddress } from './types';

export const getTokenDocumentsOnChain = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
	accounts: ParsedTokenAccountWithAddress[],
) => {
	const nativeTokenPromise = getNativeTokenDocument(
		connection,
		cluster,
		wallet,
	);
	const tokenPromises = [nativeTokenPromise];

	const splTokensPromises = accounts
		.filter((a) => a.tokenAmount.decimals !== 0)
		.map((account) => {
			return initTokenDocumentWithMetadata(connection, cluster, account);
		});

	tokenPromises.push(...splTokensPromises);

	const tokens = await Promise.all(tokenPromises);

	const quotes = await getTokenQuotes(
		tokens.map((token) => ({ address: token.mint, network: token.network })),
	);

	for (const item of tokens) {
		item.quotes =
			quotes[makeHashId({ address: item.mint, network: item.network })].quotes;
	}

	return tokens;
};

const getNativeTokenDocument = async (
	connection: Connection,
	cluster: NetworkCluster,
	key: PublicKey,
): Promise<TokenDocumentV2<SolanaToken>> => {
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
): Promise<TokenDocumentV2<SolanaToken>> => {
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
