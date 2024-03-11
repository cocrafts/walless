import type {
	SolanaCollectible,
	SolanaCollection,
	SolanaToken,
} from '@walless/core';
import { logger, Networks, ResponseCode } from '@walless/core';
import { modalActions } from '@walless/gui';
import type {
	CollectionDocumentV2,
	NftDocumentV2,
	TokenDocumentV2,
} from '@walless/store';
import { showError } from 'modals/Error';
import { ModalId } from 'modals/types';
import { solMint } from 'utils/constants';
import { useSnapshot } from 'utils/hooks';
import {
	getGasilonFee,
	getSolanaTransactionFee,
	hasEnoughBalanceToMakeTx,
	sendTransaction,
} from 'utils/transaction';
import { proxy } from 'valtio';

const initialContext: TransactionContext = {
	type: 'token',
	amount: '',
	sender: '',
	receiver: '',
	status: 'init',
	feeAmount: 0,
	feeLoading: false,
};
const txContext = proxy<{ tx: TransactionContext }>({
	tx: initialContext,
});

export const useTransactionContext = <
	T extends TransactionContext = TransactionContext,
>(): T => {
	const context = useSnapshot(txContext).tx as TokenTransactionContext &
		NftTransactionContext;

	return context as never as T;
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
		}, 600); // TODO: need to handle by modal life cycle
	},
	updateTransactionFee: async () => {
		const { network } = txContext.tx;
		switch (network) {
			case Networks.solana: {
				const { type, sender, receiver, tokenForFee, token, nft } =
					txContext.tx as SolanaTransactionContext;
				if (!type || !sender || !receiver || !network) break;

				txActions.update({ feeLoading: true });

				let fee = 0;
				const isGasilon = tokenForFee && tokenForFee.mint !== solMint;
				if (isGasilon) {
					const mint = (type === 'token' ? token?.mint : nft?.mint) as string;
					try {
						fee = await getGasilonFee({
							sender,
							receiver,
							mint,
							feeMint: tokenForFee.mint,
						});
					} catch (error) {
						logger.error('failed to get gasilon fee', error);
					}
				} else if (tokenForFee) {
					try {
						fee = await getSolanaTransactionFee({
							type,
							sender,
							receiver,
							nft,
							token,
							tokenForFee,
						});
					} catch (error) {
						logger.error('failed to get solana transaction fee', error);
					}
				}

				const currentFeeMint = txContext.tx
					.tokenForFee as TokenDocumentV2<SolanaToken>;

				if (tokenForFee?.mint === currentFeeMint?.mint) {
					txActions.update({ feeAmount: fee, feeLoading: false });
				}

				break;
			}
			default: {
				txActions.update({ feeAmount: 0 });
				break;
			}
		}
	},
	handleSendTransaction: async (passcode: string) => {
		const { type, sender, receiver, network, amount, tokenForFee, feeAmount } =
			txContext.tx;
		if (!type || !sender || !receiver || !network || !amount)
			throw Error('require type, sender, receiver, network, amount to send');

		let transaction;
		if (type === 'token') {
			const { token } = txContext.tx as TokenTransactionContext;
			if (!token) throw Error("token doesn't exist");
			transaction = {
				type,
				sender,
				receiver,
				network,
				amount: Number(amount),
				token,
				fee: feeAmount,
				...{ tokenForFee },
			};
		} else {
			const { nft } = txContext.tx as NftTransactionContext;
			if (!nft) throw Error("nft doesn't exist");
			transaction = {
				type,
				sender,
				receiver,
				network,
				amount: Number(amount),
				nft,
				fee: feeAmount,
				...{ tokenForFee },
			};
		}

		const hasEnoughBalance = await hasEnoughBalanceToMakeTx(transaction);

		if (!hasEnoughBalance) {
			showError({ errorText: 'Insufficient balance to send' });
			return;
		}

		const res = await sendTransaction(transaction, passcode);

		if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
			showError({ errorText: 'Passcode is NOT matched' });
		} else if (res.responseCode == ResponseCode.SUCCESS) {
			const signature =
				res.signatureString || res.signedTransaction?.digest || res.hash;
			txActions.update<SolanaTransactionContext>({ signature });
		}

		txActions.update({ time: new Date() });
		txActions.update({
			status: res.responseCode === ResponseCode.SUCCESS ? 'success' : 'failed',
		});

		return true;
	},
};

export type TransactionType = 'token' | 'nft';

export interface TransactionContext {
	type: TransactionType;
	network?: Networks;
	sender: string;
	receiver: string;
	amount: string;
	feeAmount: number;
	feeLoading: boolean;
	tokenForFee?: TokenDocumentV2;
	status: 'init' | 'success' | 'failed';
	time?: Date;
}

export type TokenTransactionContext = TransactionContext & {
	token?: TokenDocumentV2;
};

export type NftTransactionContext = TransactionContext & {
	nft?: NftDocumentV2;
	collection?: CollectionDocumentV2;
};

export type SolanaTransactionContext = SolanaTokenTransactionContext &
	SolanaCollectibleTransactionContext;

export type SolanaTokenTransactionContext = TokenTransactionContext & {
	signature?: string;
	token?: TokenDocumentV2<SolanaToken>;
	tokenForFee?: TokenDocumentV2<SolanaToken>;
};

export type SolanaCollectibleTransactionContext = NftTransactionContext & {
	signature?: string;
	nft?: NftDocumentV2<SolanaCollectible>;
	collection?: CollectionDocumentV2<SolanaCollection>;
	tokenForFee?: TokenDocumentV2<SolanaToken>;
};

export type CombinedTransactionContext = SolanaTransactionContext;
