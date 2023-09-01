import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

import type { SolanaContext } from './shared';

export const getAllTokens = async (
	{ connection }: SolanaContext,
	address: string,
) => {
	const key = new PublicKey(address);
	const filter = { programId: TOKEN_PROGRAM_ID };
	const response = await connection.getParsedTokenAccountsByOwner(key, filter);
};
