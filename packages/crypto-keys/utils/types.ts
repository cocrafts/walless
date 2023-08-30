import type { Networks } from '@walless/core';

export interface Prefix {
	path: string;
	network: Networks;
}

export interface KeypairResult<T> {
	type: string;
	address: string;
	privateKey: T;
}

export enum SeedPhraseFormatType {
	PRIMARY = 'primary-seed-phrase',
}

type InitializeMethodByChain<T> = (
	prefix: Prefix,
	seedPhrase: string,
) => Promise<KeypairResult<T>>;

export type KeypairBySeedPhraseInitializer<T> = {
	solana: InitializeMethodByChain<T>;
	sui: InitializeMethodByChain<T>;
	tezos: InitializeMethodByChain<T>;
};
