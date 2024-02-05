import type { VersionedTransaction } from '@solana/web3.js';
import type { Networks } from '@walless/core';
import { logger } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import { showError } from 'modals/Error';
import { ModalId } from 'modals/types';
import type { JupiterToken } from 'utils/hooks';
import type { SwapQuote } from 'utils/transaction';
import { constructSwapTransaction, getMappedMint } from 'utils/transaction';
import { proxy } from 'valtio';

import SelectFromToken from './Select/SelectFromToken';
import SelectToToken from './Select/SelectToToken';

export interface SwapContext {
	network?: Networks;
	fromToken?: TokenDocument;
	toToken?: JupiterToken;
	amount: string;
	swapQuote?: SwapQuote;
	transaction?: VersionedTransaction;
}

const initialContext = {
	amount: '',
};

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
		setTimeout(() => {
			swapActions.resetContext();
		}, 200);
	},
	openSelectToken: (type: 'from' | 'to') => {
		modalActions.show({
			id: modalMap[type].id,
			bindingDirection: BindDirections.InnerBottom,
			animateDirection: AnimateDirections.Top,
			fullHeight: true,
			maskActiveOpacity: 0.1,
			positionOffset: { y: 32 },
			component: modalMap[type].component,
		});
	},
	closeSelectToken: (type: 'from' | 'to') => {
		modalActions.hide(modalMap[type].id);
	},
	prepareSwapTransaction: async (publicKey: string) => {
		const { fromToken, toToken, amount } = swapContext.swap;
		if (!fromToken || !toToken || !amount) {
			showError({ errorText: 'Please input tokens to swap' });
			return;
		}

		const fromMint = getMappedMint(fromToken);
		if (fromMint === toToken.address) {
			showError({ errorText: 'Can not swap these tokens' });
			return;
		}

		const amountValue = parseFloat(amount);
		if (isNaN(amountValue) || amountValue === 0) {
			showError({ errorText: 'Invalid amount to swap' });
			return;
		}

		try {
			const transaction = await constructSwapTransaction({
				fromMint: fromMint,
				toMint: toToken.address,
				amount: amountValue * 10 ** fromToken.account.decimals,
				userPublicKey: publicKey,
				wrapAndUnwrapSol: true,
			});

			swapContext.swap.transaction = transaction;
		} catch (error) {
			const errorText = (error as Error).message;
			showError({ errorText });
			logger.error('swap error:', errorText);
		}
	},
};
