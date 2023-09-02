import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getMetadata } from './metadata';
import type { SolanaContext } from './shared';
import { throttle, tokenFilter } from './shared';

export const getAllTokensByAddress = async (
	context: SolanaContext,
	address: string,
) => {
	const { connection, endpoint } = context;
	const key = new PublicKey(address);
	const filter = { programId: TOKEN_PROGRAM_ID };
	const response = await throttle(() => {
		return connection.getParsedTokenAccountsByOwner(key, filter);
	})();
	const resultPromises = response.value
		.filter(tokenFilter as never)
		.map(async ({ account }): Promise<TokenDocument> => {
			const { data, owner } = account;
			const info = data.parsed?.info || {};
			const metadata = await getMetadata(context, info.mint);

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
			};
		});

	return await Promise.all(resultPromises);
};
