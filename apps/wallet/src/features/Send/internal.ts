import type {
	Networks,
	SolanaCollectible,
	SolanaCollection,
	SolanaToken,
} from '@walless/core';
import { modalActions } from '@walless/gui';
import type {
	CollectionDocumentV2,
	NftDocumentV2,
	TokenDocumentV2,
} from '@walless/store';
import { ModalId } from 'modals/types';
import { useSnapshot } from 'utils/hooks';
import { proxy } from 'valtio';

const initialContext: Partial<TransactionContext> = {};
export const txContext = proxy<{ tx: TransactionContext }>({
	tx: initialContext as TransactionContext,
});

export const useTransactionContext = <
	T extends TransactionContext = TransactionContext,
>(): T => {
	return useSnapshot(txContext).tx as T;
};

export const txActions = {
	update<T extends TransactionContext = TransactionContext>(tx: Partial<T>) {
		Object.keys(tx).forEach((key) => {
			const k = key as never as keyof T;
			(txContext.tx as never as T)[k] = tx[k] as never;
		});
	},
	resetTransactionContext: () => {
		txContext.tx = { ...(initialContext as TransactionContext) };
	},
	closeSendFeature: () => {
		modalActions.hide(ModalId.Send);

		setTimeout(() => {
			txActions.resetTransactionContext();
		}, 200);
	},
};

export type TransactionType = 'token' | 'nft';

export interface TransactionContext {
	type: TransactionType;
	network: Networks;
	sender: string;
	receiver: string;
	amount: string;
	feeAmount: number;
	tokenForFee: TokenDocumentV2 | null;
	status: 'success' | 'failed';
	time: Date;
}

export type TokenTransactionContext = TransactionContext & {
	token: TokenDocumentV2;
};

export type NftTransactionContext = TransactionContext & {
	nft: NftDocumentV2;
	collection: CollectionDocumentV2;
};

export type SolanaTransactionContext = SolanaTokenTransactionContext &
	SolanaCollectibleTransactionContext;

export type SolanaTokenTransactionContext = TokenTransactionContext & {
	signature: string;
	token: TokenDocumentV2<SolanaToken>;
};

export type SolanaCollectibleTransactionContext = NftTransactionContext & {
	signature: string;
	nft: NftDocumentV2<SolanaCollectible>;
	collection: CollectionDocumentV2<SolanaCollection>;
};
