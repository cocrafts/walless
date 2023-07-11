import type { Networks } from '@walless/core';
import { proxy } from 'valtio';

export interface TransactionContext {
	sender: string;
	receiver: string;
	token: string;
	network: Networks;
	amount: number;
	signatureString: string;
}

export type PendingTransactionContext = Omit<
	TransactionContext,
	'signatureString'
>;

export interface TransactionState {
	counter: number;
}

export const transactionState = proxy<TransactionState>({
	counter: 0,
});
