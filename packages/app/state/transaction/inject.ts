import { Networks, Token } from '@walless/core';
import { proxy } from 'valtio';

export interface InjectedElements {
	tokens: Token[];
	getTransactionFee: (network: Networks) => Promise<number>;
	handleClose: () => void;
}

export const injectedElements = proxy<InjectedElements>({
	tokens: [],
	getTransactionFee: async () => 0,
	handleClose: () => console.log('close'),
});
