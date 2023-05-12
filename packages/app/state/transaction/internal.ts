import { Token } from '@walless/core';
import { ResponseCode } from '@walless/messaging';
import { proxy } from 'valtio';

export interface TransactionContext {
	sender: string;
	receiver: string;
	token?: Token;
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
	sender: '',
	receiver: '',
	signatureString: '',
});
