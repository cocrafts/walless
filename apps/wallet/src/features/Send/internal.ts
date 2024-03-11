import { useEffect } from 'react';
import type {
	SolanaCollectible,
	SolanaCollection,
	SolanaToken,
} from '@walless/core';
import { Networks, ResponseCode } from '@walless/core';
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

const initialContext: Partial<TransactionContext> = {};
const txContext = proxy<{ tx: TransactionContext }>({
	tx: initialContext as TransactionContext,
});

export const useTransactionContext = <
	T extends TransactionContext = TransactionContext,
>(): T => {
	const context = useSnapshot(txContext).tx as TokenTransactionContext &
		NftTransactionContext;

	const { type, network, token, nft, tokenForFee, receiver } = context;

	useEffect(() => {
		txActions.updateTransactionFee();
	}, [type, network, token, nft, tokenForFee, receiver]);

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
		}, 200);
	},
	updateTransactionFee: async () => {
		txActions.update({ feeLoading: true });
		const { network } = txContext.tx;
		switch (network) {
			case Networks.solana: {
				const { type, sender, receiver, tokenForFee, token, nft } =
					txContext.tx as SolanaTransactionContext;
				if (!sender || !receiver || !tokenForFee || !token || !nft) return;

				const isGasilon = tokenForFee && tokenForFee.mint !== solMint;
				if (isGasilon) {
					const { fee, mint } = await getGasilonFee({
						sender,
						receiver,
						mint: type === 'token' ? token.mint : nft.mint,
						feeMint: tokenForFee.mint,
					});
					const newestTokenFee = txContext.tx
						.tokenForFee as TokenDocumentV2<SolanaToken>;
					if (mint == newestTokenFee.mint) {
						txActions.update({ feeAmount: fee });
					}
				} else {
					const { fee, mint } = await getSolanaTransactionFee({
						type,
						sender,
						receiver,
						nft,
						token,
						tokenForFee,
					});

					const currentFeeMint = (
						txContext.tx.tokenForFee as TokenDocumentV2<SolanaToken>
					).mint;

					if (mint === currentFeeMint) txActions.update({ feeAmount: fee });
				}
				break;
			}
			default: {
				txActions.update({ feeAmount: 0 });
				break;
			}
		}
		txActions.update({ feeLoading: false });
	},
	handleSendTransaction: async (passcode: string) => {
		const { type, sender, receiver, network, amount, tokenForFee } =
			txContext.tx;

		let transaction;
		if (type === 'token') {
			const { token } = txContext.tx as TokenTransactionContext;
			transaction = {
				type,
				sender,
				receiver,
				network,
				amount: Number(amount),
				token,
				...{ tokenForFee },
			};
		} else {
			const { nft } = txContext.tx as NftTransactionContext;
			transaction = {
				type,
				sender,
				receiver,
				network,
				amount: Number(amount),
				nft,
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
	feeLoading: boolean;
	tokenForFee?: TokenDocumentV2;
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
	tokenForFee: TokenDocumentV2<SolanaToken>;
};

export type SolanaCollectibleTransactionContext = NftTransactionContext & {
	signature: string;
	nft: NftDocumentV2<SolanaCollectible>;
	collection: CollectionDocumentV2<SolanaCollection>;
	tokenForFee: TokenDocumentV2<SolanaToken>;
};

export type CombinedTransactionContext = SolanaTransactionContext;
