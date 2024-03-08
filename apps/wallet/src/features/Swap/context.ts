import type { VersionedTransaction } from '@solana/web3.js';
import type { Networks, SolanaToken } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import type { TokenDocumentV2 } from '@walless/store';
import { ModalId } from 'modals/types';
import type { JupiterToken } from 'utils/hooks';
import type { SwapQuote } from 'utils/transaction';
import { constructSwapTransaction, getAliasedMint } from 'utils/transaction';
import { proxy } from 'valtio';

import SelectFromToken from './Select/SelectFromToken';
import SelectToToken from './Select/SelectToToken';
import Success from './Success';

export interface SwapContext {
	network: Networks;
	fromToken?: TokenDocumentV2<SolanaToken>;
	toToken?: JupiterToken;
	amount: string;
	swapQuote?: SwapQuote;
	transaction?: VersionedTransaction;
}

const initialContext = {} as SwapContext;

export const swapContext = proxy<{ swap: SwapContext }>({
	swap: initialContext,
});

const modalMap = {
	from: {
		id: ModalId.Swap + 'SelectFromToken',
		component: SelectFromToken,
	},
	to: {
		id: ModalId.Swap + 'SelectToToken',
		component: SelectToToken,
	},
};

export const swapActions = {
	update(tx: Partial<SwapContext>) {
		Object.keys(tx).forEach((key) => {
			const k = key as never as keyof SwapContext;
			swapContext.swap[k] = tx[k] as never;
		});
	},
	resetContext: () => {
		swapContext.swap = { ...initialContext };
	},
	closeSwap: () => {
		modalActions.hide(ModalId.Swap);
	},
	openSelectToken: (type: 'from' | 'to') => {
		modalActions.show({
			id: modalMap[type].id,
			bindingDirection: BindDirections.InnerBottom,
			animateDirection: AnimateDirections.Top,
			fullHeight: true,
			maskActiveOpacity: 0.1,
			component: modalMap[type].component,
		});
	},
	closeSelectToken: (type: 'from' | 'to') => {
		modalActions.hide(modalMap[type].id);
	},
	prepareSwapTransaction: async (publicKey: string) => {
		const { fromToken, toToken, amount } = swapContext.swap;
		if (!fromToken || !toToken || !amount) {
			throw Error('Please input tokens to swap');
		}

		const fromMint = getAliasedMint(fromToken);
		if (fromMint === toToken.address) {
			throw Error('Can not swap these tokens');
		}

		const amountValue = parseFloat(amount);
		if (isNaN(amountValue) || amountValue === 0) {
			throw Error('Invalid amount to swap');
		}

		const transaction = await constructSwapTransaction({
			fromMint: fromMint,
			toMint: toToken.address,
			amount: amountValue * 10 ** fromToken.decimals, // jupiter uses int amount with decimals
			userPublicKey: publicKey,
			wrapAndUnwrapSol: true,
		});

		swapContext.swap.transaction = transaction;
	},
	showSuccess: () => {
		const id = ModalId.Swap + 'Success';

		modalActions.show({
			id,
			bindingDirection: BindDirections.InnerTop,
			animateDirection: AnimateDirections.Bottom,
			component: Success,
			withoutMask: true,
		});

		setTimeout(() => {
			modalActions.hide(id);
			// TODO: need to resolve this callback hell by modal life cycle
			setTimeout(() => {
				swapActions.resetContext();
			}, 200);
		}, 3000);
	},
};
