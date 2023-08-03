import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Endpoint } from '@walless/core';
import { Networks } from '@walless/core';
import type { Database, TokenDocument } from '@walless/store';

import { getSolanaMetadata } from './metadata';
import { solMetadata, solMint } from './shared';

interface TokenByAddressOption {
	endpoint: Endpoint;
	storage: Database;
	connection: Connection;
	address: string;
}

export const solanaTokensByAddress = async ({
	endpoint,
	storage,
	connection,
	address,
}: TokenByAddressOption): Promise<TokenDocument[]> => {
	const key = new PublicKey(address);
	const response = await connection.getParsedTokenAccountsByOwner(key, {
		programId: TOKEN_PROGRAM_ID,
	});

	const resultPromises = response.value
		.filter((ele) => ele.account.data.parsed.info.tokenAmount.decimals > 0)
		.map(async ({ account }) => {
			const { data, owner } = account;
			const info = data.parsed?.info || {};
			const metadata = await getSolanaMetadata({
				storage,
				connection,
				mintAddress: info.mint,
			});

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
				metadata: metadata,
			} satisfies TokenDocument;
		});

	resultPromises.unshift(
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
