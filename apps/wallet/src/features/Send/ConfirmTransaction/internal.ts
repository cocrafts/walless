import type { RequireKeys } from 'utils/types';

import type {
	NftTransactionContext,
	TokenTransactionContext,
	TransactionContext,
} from '../internal';

export type FulfilledTransaction = RequireKeys<TransactionContext, 'network'>;

export type FulfilledTokenTransaction = FulfilledTransaction &
	RequireKeys<TokenTransactionContext, 'token'>;

export type FulfilledNftTransaction = FulfilledTransaction &
	RequireKeys<NftTransactionContext, 'nft' | 'collection'>;
