import type { Collectible, Collection, Token } from '@walless/core';
import type { ResponseCode } from '@walless/messaging';
import { proxy } from 'valtio';

export type TransactionType = 'Token' | 'Collectible';

export interface TransactionContext {
	type: TransactionType;
	sender: string;
	receiver: string;
	token?: Token;
	nftCollection?: Collection;
	nftCollectible?: Collectible;
	transactionFee?: number;
	amount?: string;
	signatureString: string;
	status?: ResponseCode;
	time?: Date;
}

export type PendingTransactionContext = Omit<
	TransactionContext,
	'signatureString'
>;

export const transactionContext = proxy<TransactionContext>({
	type: 'Token',
	sender: '',
	receiver: '',
	signatureString: '',
});
