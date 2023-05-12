import { Networks, Token, TransactionPayload } from '@walless/core';
import { ResponsePayload } from '@walless/messaging';
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
	createAndSendTransaction: (
		payload: TransactionPayload,
		passcode?: string,
	) => Promise<ResponsePayload>;
	getTransactionResult: (
		signature: string,
		networkd: Networks,
	) => Promise<{ time?: Date }>;
}

export const injectedElements = proxy<InjectedElements>({
	tokens: [],
	publicKeys: [],
	getTransactionFee: async () => 0,
	handleClose: () => console.log('close'),
	checkValidAddress: () => {
		return { valid: true, message: '' };
	},
	createAndSendTransaction: async () => {
		return {};
	},
	getTransactionResult: async () => {
		return {};
	},
});
