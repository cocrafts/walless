import type { ResponseCode } from '@walless/messaging';
import type {
	CollectibleDocument,
	CollectionDocument,
	TokenDocument,
} from '@walless/store';
import { proxy } from 'valtio';

export type TransactionType = 'Token' | 'Collectible';

export interface TransactionContext {
	type: TransactionType;
	sender: string;
	receiver: string;
	token?: TokenDocument;
	nftCollection?: CollectionDocument;
	nftCollectible?: CollectibleDocument;
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
