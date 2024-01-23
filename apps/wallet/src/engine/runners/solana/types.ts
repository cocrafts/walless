import type { Connection, PublicKey, TokenAmount } from '@solana/web3.js';
import type { Endpoint } from '@walless/core';

export type SolanaContext = {
	connection: Connection;
	endpoint: Endpoint;
};

export type ParsedTokenAccountWithAddress = ParsedTokenAccount & {
	publicKey: PublicKey;
};

export type ParsedTokenAccount = {
	mint: string;
	owner: string;
	state: string;
	tokenAmount: TokenAmount;
};
