import type {
	SolanaCollectible,
	SolanaCollection,
	SolanaToken,
	SuiToken,
} from '@walless/core';
import { logger, Networks, ResponseCode } from '@walless/core';
import { modalActions } from '@walless/gui';
import type {
	CollectionDocument,
	NftDocument,
	TokenDocument,
} from '@walless/store';
import { engine } from 'engine';
import type { SolanaContext, SuiContext } from 'engine/runners';
import { throttle } from 'lodash';
import { showError } from 'modals/Error';
import { ModalId } from 'modals/types';
import { solMint } from 'utils/constants';
import { useSnapshot } from 'utils/hooks';
import {
	createAndSendSuiTransaction,
	createAndSendTezosTransaction,
	getSuiTransactionFee,
	hasEnoughBalanceToMakeTx,
} from 'utils/transaction';
import { createAndSendSolanaTransaction } from 'utils/transaction';
import { constructSuiSendTokenTransaction } from 'utils/transaction';
import {
	getGasilonFee,
	getSolanaTransactionFee,
} from 'utils/transaction/solana/send/fee';
import type {
	SolanaSendTransaction,
	SuiSendTransaction,
	TezosSendTokenTransaction,
} from 'utils/transaction/types';
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
	handleAfterSent: () => {
		txContext.tx.onSent?.();
	},
	updateTransactionFee: throttle(async () => {
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
					.tokenForFee as TokenDocument<SolanaToken>;

				if (tokenForFee?.mint === currentFeeMint?.mint) {
					txActions.update({ feeAmount: fee, feeLoading: false });
				}

				break;
			}

			case Networks.sui: {
				txActions.update({ feeLoading: true });
				const genericTransaction = await createGenericTransaction();
				const { client } = engine.getContext<SuiContext>(Networks.sui);
				const transactionBlock = await constructSuiSendTokenTransaction(
					client,
					genericTransaction as SuiSendTransaction,
				);
				const fee = await getSuiTransactionFee(transactionBlock).catch(
					(error) => {
						logger.error('Failed to get Sui transaction fee', error);
						throw new Error('Failed to get Sui transaction fee', error);
					},
				);

				txActions.update({ feeAmount: fee, feeLoading: false });
				break;
			}

			// case Networks.tezos: {
			// 	txActions.update({ feeLoading: true });
			// 	const genericTransaction = await createGenericTransaction();
			// 	const { connection } = engine.getContext<TezosContext>(Networks.tezos);
			// 	const fee = await getTezosTransactionFee(
			// 		genericTransaction as TezosSendTokenTransaction,
			// 		connection,
			// 	);
			// 	txActions.update({ feeAmount: fee, feeLoading: false });
			// 	break;
			// }

			default: {
				txActions.update({ feeAmount: 0 });
				break;
			}
		}
	}, 300),
	handleSendTransaction: async (passcode: string, onComplete?: () => void) => {
		const genericTransaction = await createGenericTransaction();
		if (txContext.tx.network === Networks.solana) {
			const res = await createAndSendSolanaTransaction(
				genericTransaction as SolanaSendTransaction,
				passcode,
			);

			if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
				showError({ errorText: 'Passcode is NOT matched' });
			} else if (res.responseCode == ResponseCode.SUCCESS) {
				const signature = res.signatureString;
				txActions.update<SolanaTransactionContext>({ signature });
				const { connection } = engine.getContext<SolanaContext>(
					Networks.solana,
				);
				connection.onSignature(
					signature,
					async () => {
						txActions.update({ status: 'finalizing' });
					},
					'confirmed',
				);
				connection.onSignature(
					signature,
					async () => {
						const status = await connection.getSignatureStatus(signature);
						if (!status.value?.err) {
							txActions.update({ status: 'success' });
						} else {
							txActions.update({ status: 'failed' });
						}
						onComplete?.();
					},
					'finalized',
				);
			}

			txActions.update({ time: new Date() });
			txActions.update({
				status:
					res.responseCode === ResponseCode.SUCCESS ? 'pending' : 'failed',
			});
		} else if (txContext.tx.network === Networks.sui) {
			const res = await createAndSendSuiTransaction(
				genericTransaction as SuiSendTransaction,
				passcode,
			);

			if (res.responseCode === ResponseCode.WRONG_PASSCODE) {
				showError({ errorText: 'Passcode is NOT matched' });
			} else if (res.responseCode === ResponseCode.SUCCESS) {
				const signature = res.signatureString;
				txActions.update<SuiTransactionContext>({ signature });
				txActions.update({ time: new Date() });
				txActions.update({
					status:
						res.responseCode === ResponseCode.SUCCESS ? 'success' : 'failed',
				});
				onComplete?.();
			}
		} else if (txContext.tx.network === Networks.tezos) {
			const payload = {
				sender: genericTransaction?.sender,
				receiver: genericTransaction?.receiver,
				amount: genericTransaction?.amount,
				token: genericTransaction?.token,
			} as TezosSendTokenTransaction;

			const res = await createAndSendTezosTransaction(payload, passcode);

			if (res.responseCode === ResponseCode.WRONG_PASSCODE) {
				showError({ errorText: 'Passcode is NOT matched' });
			} else if (res.responseCode === ResponseCode.SUCCESS) {
				const signature = res.signatureString;
				txActions.update<TezosTransactionContext>({ signature });
				txActions.update({ time: new Date() });
				txActions.update({
					status: res.isSuccessful ? 'success' : 'failed',
				});
				onComplete?.();
			}
		}

		return true;
	},
};

const createGenericTransaction = async () => {
	const { type, sender, receiver, network, amount, tokenForFee, feeAmount } =
		txContext.tx;

	let transaction;
	if (network === Networks.solana) {
		if (!type || !sender || !receiver || !network)
			throw Error('require type, sender, receiver, network to send');

		if (type === 'token') {
			if (!amount) throw Error("require amount when type is 'token'");
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
				amount: 1,
				nft,
				fee: feeAmount,
				...{ tokenForFee },
			};
		}
	} else if (network === Networks.sui) {
		if (!type || !sender || !receiver || !network)
			throw new Error('Require type, sender, receiver and network to send');

		if (type === 'token') {
			const { token, tokenForFee } = txContext.tx as SuiTokenTransactionContext;
			if (!token || !tokenForFee)
				throw new Error('Require token and tokenForFee to send');

			transaction = {
				type,
				amount: Number(amount) || 0,

				network,
				receiver,
				sender,
				token,
				tokenForFee,
			};
		} else {
			throw new Error('Transfer Sui NFT not supported');
		}
	} else if (network === Networks.tezos) {
		const { token } = txContext.tx as TokenTransactionContext;
		transaction = {
			sender,
			receiver,
			token,
			amount: parseInt(amount) || 0,
			network,
			type,
		} as TezosSendTokenTransaction;
	} else {
		throw new Error('Unsupported network');
	}

	const hasEnoughBalance = await hasEnoughBalanceToMakeTx(transaction);

	if (!hasEnoughBalance) {
		console.log('100');
		showError({ errorText: 'Insufficient balance to send' });
		return;
	}

	return transaction;
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
	tokenForFee?: TokenDocument;
	status: 'init' | 'pending' | 'finalizing' | 'success' | 'failed';
	time?: Date;
	onSent?: () => void;
}

export type TokenTransactionContext = TransactionContext & {
	token?: TokenDocument;
};

export type NftTransactionContext = TransactionContext & {
	nft?: NftDocument;
	collection?: CollectionDocument;
};

export type GenericTransactionContext = TokenTransactionContext &
	NftTransactionContext;

export type SolanaTransactionContext = SolanaTokenTransactionContext &
	SolanaCollectibleTransactionContext;

export type SolanaTokenTransactionContext = TokenTransactionContext & {
	signature?: string;
	token?: TokenDocument<SolanaToken>;
	tokenForFee?: TokenDocument<SolanaToken>;
};

export type SolanaCollectibleTransactionContext = NftTransactionContext & {
	signature?: string;
	nft?: NftDocument<SolanaCollectible>;
	collection?: CollectionDocument<SolanaCollection>;
	tokenForFee?: TokenDocument<SolanaToken>;
};

export type CombinedTransactionContext = SolanaTransactionContext;

export type SuiTokenTransactionContext<T extends SuiToken = SuiToken> =
	TokenTransactionContext & {
		token?: TokenDocument<T>;
		tokenForFee?: TokenDocument<T>;
	};

export type SuiCollectibleTransactionContext = NftTransactionContext;

export type SuiTransactionContext = SuiTokenTransactionContext &
	SuiCollectibleTransactionContext & {
		signature?: string;
	};

export type TezosTransactionContext = TokenTransactionContext & {
	signature?: string;
};
