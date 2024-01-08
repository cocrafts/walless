import type { Networks } from '@walless/core';
import { modalActions } from '@walless/gui';
import type { ResponseCode } from '@walless/messaging';
import type {
	CollectibleDocument,
	CollectionDocument,
	TokenDocument,
} from '@walless/store';
import { ModalId } from 'modals/internal';
import { proxy } from 'valtio';

export type TransactionType = 'Token' | 'Collectible';

export interface TransactionContext {
	type: TransactionType;
	sender: string;
	receiver: string;
	network?: Networks;
	token?: TokenDocument;
	tokenForFee?: TokenDocument;
	collection?: CollectionDocument;
	collectible?: CollectibleDocument;
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

const initialContext = {
	type: 'Token' as TransactionType,
	sender: '',
	receiver: '',
	signatureString: '',
};

const state = proxy<{ tx: TransactionContext }>({
	tx: initialContext,
});

export const txContext = state.tx;

export const txActions = {
	update(tx: Partial<TransactionContext>) {
		Object.keys(tx).forEach((key) => {
			const k = key as never as keyof TransactionContext;
			state.tx[k] = tx[k] as never;
		});
	},
	resetTransactionContext: () => {
		state.tx = initialContext;
	},
	closeSendFeature: () => {
		modalActions.hide(ModalId.Send);

		setTimeout(() => {
			txActions.resetTransactionContext();
		}, 200);
	},
};
