import type { PublicKey } from '@solana/web3.js';

export type SolTransaction = {
	sender: PublicKey;
	receiver: PublicKey;
	amount: number;
};

export type SplTransaction = {
	sender: PublicKey;
	receiver: PublicKey;
	amount: number;
	mint: PublicKey;
};

export type NftTransaction = {
	sender: PublicKey;
	receiver: PublicKey;
	amount: number;
	mint: PublicKey;
};

export type GasilonTransaction = {
	sender: PublicKey;
	receiver: PublicKey;
	amount: number;
	mint: PublicKey;
	fee: number;
	feeMint: PublicKey;
	feePayer: PublicKey;
};

export type Accounts = {
	payer: PublicKey;
	associatedToken: PublicKey;
	owner: PublicKey;
	mint: PublicKey;
};
