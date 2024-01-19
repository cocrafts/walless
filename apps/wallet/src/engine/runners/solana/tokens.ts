import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { TokenAmount } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Endpoint } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import { getTokenQuotes, makeHashId } from 'utils/api';
import { solMint } from 'utils/constants';

import { throttle } from './internal';
import { getMetadata, solMetadata } from './metadata';
import type { SolanaContext } from './types';

export const getTokenDocumentsOnChain = async (
	{ connection, endpoint }: SolanaContext,
	wallet: string,
) => {
	const walletPublicKey = new PublicKey(wallet);
	const nativeTokenPromise = getNativeTokenDocument(
		connection,
		endpoint,
		walletPublicKey,
	);
	const tokenPromises: Promise<TokenDocument>[] = [nativeTokenPromise];

	const accounts = await throttle(async () =>
		getParsedTokenAccountsByOwner(connection, walletPublicKey),
	)();

	const splTokensPromises = accounts
		.filter((a) => a.tokenAmount.decimals !== 0)
		.map((account) => {
			return initTokenDocumentWithMetadata(connection, endpoint, account);
		});

	tokenPromises.push(...splTokensPromises);

	const tokens = await Promise.all(tokenPromises);

	const quotes = await getTokenQuotes(tokens);

	for (const item of tokens) {
		item.account.quotes = quotes[makeHashId(item)].quotes;
	}

	return tokens;
};

const getNativeTokenDocument = async (
	connection: Connection,
	endpoint: Endpoint,
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

type ParsedTokenAccount = {
	publicKey: PublicKey;
	mint: string;
	owner: string;
	state: string;
	tokenAmount: TokenAmount;
};

const getParsedTokenAccountsByOwner = async (
	connection: Connection,
	ownerPubkey: PublicKey,
) => {
	const accounts = await connection.getParsedTokenAccountsByOwner(
		ownerPubkey,
		{ programId: TOKEN_PROGRAM_ID },
		'confirmed',
	);

	return accounts.value.map((ele) => {
		return {
			publicKey: ele.pubkey.toString(),
			...ele.account.data.parsed.info,
		} as ParsedTokenAccount;
	});
};

const initTokenDocumentWithMetadata = async (
	connection: Connection,
	endpoint: Endpoint,
	account: ParsedTokenAccount,
): Promise<TokenDocument> => {
	const metadata = await getMetadata(connection, account.mint);

	return {
		_id: `${account.owner}/token/${account.mint}`,
		network: Networks.solana,
		endpoint,
		type: 'Token',
		account: {
			mint: account.mint,
			owner: account.owner,
			address: account.publicKey.toString(),
			balance: account.tokenAmount.amount,
			decimals: account.tokenAmount.decimals,
		},
		metadata: metadata,
	};
};
