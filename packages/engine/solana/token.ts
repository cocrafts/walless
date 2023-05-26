import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { type Connection, PublicKey } from '@solana/web3.js';
import { type Endpoint, Networks } from '@walless/core';
import { type TokenDocument } from '@walless/store';

import {
	type GetSolanaMetadataFunction,
	getRemoteSolanaMetadata,
} from './metadata';
import { solMetadata, solMint } from './shared';

interface TokenByAddressOption {
	endpoint: Endpoint;
	connection: Connection;
	address: string;
	metadataFetcher?: GetSolanaMetadataFunction;
}

export const solanaTokensByAddress = async ({
	endpoint,
	connection,
	address,
	metadataFetcher = getRemoteSolanaMetadata,
}: TokenByAddressOption): Promise<TokenDocument[]> => {
	const key = new PublicKey(address);
	const response = await connection.getParsedTokenAccountsByOwner(key, {
		programId: TOKEN_PROGRAM_ID,
	});

	const resultPromises = response.value.map(async ({ account }) => {
		const { data, owner } = account;
		const info = data.parsed?.info || {};

		return {
			_id: `${address}/${info.mint}`,
			network: Networks.solana,
			endpoint,
			type: 'Token',
			account: {
				mint: info.mint,
				owner: owner.toString(),
				address,
				balance: info.tokenAmount?.amount,
				decimals: info.tokenAmount?.decimals,
			},
			metadata: await metadataFetcher(connection, info.mint),
		} satisfies TokenDocument;
	});

	resultPromises.push(
		(async () => {
			const balance = await connection.getBalance(key);

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
		})(),
	);

	return await Promise.all(resultPromises);
};
