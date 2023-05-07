import { Token } from '@walless/core';
import { proxy } from 'valtio';

export interface TransactionContext {
	sender: string;
	receiver: string;
	token?: Token;
	transactionFee?: number;
	amount: number;
	signatureString: string;
}

export type PendingTransactionContext = Omit<
	TransactionContext,
	'signatureString'
>;

export const transactionContext = proxy<TransactionContext>({
	sender: '',
	receiver: '',
	amount: 0,
	signatureString: '',
});
