import { Token } from '@walless/core';
import { proxy } from 'valtio';

export interface TransactionContext {
	sender: string;
	receiver: string;
	token?: Token;
	transactionFee?: number;
	amount?: string;
	signatureString: string;
}

export type PendingTransactionContext = Omit<
	TransactionContext,
	'signatureString'
>;

export const transactionContext = proxy<TransactionContext>({
	sender: '',
	receiver: '',
	signatureString: '',
});
