import { Networks, Token } from '@walless/core';
import { PublicKeyDocument } from '@walless/store';
import { proxy } from 'valtio';

export interface InjectedElements {
	tokens: Token[];
	publicKeys: PublicKeyDocument[];
	getTransactionFee: (network: Networks) => Promise<number>;
	handleClose: () => void;
	checkValidAddress: (
		keyStr: string,
		network: Networks,
	) => { valid: boolean; message: string };
}

export const injectedElements = proxy<InjectedElements>({
	tokens: [],
	publicKeys: [],
	getTransactionFee: async () => 0,
	handleClose: () => console.log('close'),
	checkValidAddress: () => {
		return { valid: true, message: '' };
	},
});
