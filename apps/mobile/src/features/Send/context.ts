import { modalActions } from '@walless/gui';
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
	tokenForFee?: TokenDocument;
	collection?: CollectionDocument;
	collectible?: CollectibleDocument;
	transactionFee?: number;
	amount?: string;
	signatureString: string;
	status?: ResponseCode;
	time?: Date;
	modalId?: string;
}

export type PendingTransactionContext = Omit<
	TransactionContext,
	'signatureString'
>;

const initialContext = {
	type: 'Token' as TransactionType,
	sender: '',
	receiver: '',
	signatureString: '',
};

export let txContext = proxy<TransactionContext>(initialContext);

export const txActions = {
	setType: (type: TransactionType) => {
		txContext.type = type;
	},
	setSender: (sender: string) => {
		txContext.sender = sender;
	},
	setReceiver: (receiver: string) => {
		txContext.receiver = receiver;
	},
	setToken: (token: TokenDocument) => {
		txContext.token = token;
	},
	setCollection: (collection: CollectionDocument) => {
		txContext.collection = collection;
	},
	setCollectible: (collectible: CollectibleDocument) => {
		txContext.collectible = collectible;
	},
	setTokenForFee: (tokenForFee: TokenDocument) => {
		txContext.tokenForFee = tokenForFee;
	},
	setTransactionFee: (fee: number) => {
		txContext.transactionFee = fee;
	},
	setAmount: (amount: string) => {
		txContext.amount = amount;
	},
	setSignatureString: (signature: string) => {
		txContext.signatureString = signature;
	},
	setStatus: (status: ResponseCode) => {
		txContext.status = status;
	},
	setTime: () => {
		txContext.time = new Date();
	},
	resetTransactionContext: () => {
		txContext = proxy<TransactionContext>(initialContext);
	},
	closeSendFeature: () => {
		if (txContext.modalId) {
			modalActions.hide(txContext.modalId);
		}

		setTimeout(() => {
			txActions.resetTransactionContext();
		}, 200);
	},
};
