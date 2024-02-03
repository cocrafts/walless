import type { Networks } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import { ModalId } from 'modals/types';
import type { JupiterToken } from 'utils/hooks';
import type { SwapQuote } from 'utils/transaction';
import { proxy } from 'valtio';

import SelectFromToken from './Select/SelectFromToken';
import SelectToToken from './Select/SelectToToken';

export interface SwapContext {
	network?: Networks;
	fromToken?: TokenDocument;
	toToken?: JupiterToken;
	amount: string;
	swapQuote?: SwapQuote;
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
};
