import { importKey } from '@taquito/signer';
import type { TezosToolkit } from '@taquito/taquito';

export interface TezosTransaction {
	type: 'native' | 'custom';
	receiver: string;
	amount: number;
	tokenAddress?: string;
}

export const constructSendTezTransaction = (
	receiver: string,
	amount: number,
): TezosTransaction => {
	return {
		type: 'native',
		receiver,
		amount,
	};
};

export const transferToken = async (
	toolkit: TezosToolkit,
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const transaction: TezosTransaction = JSON.parse(transactionStr);
	if (transaction.type !== 'native') {
		throw Error('Not support this token');
	}

	await importKey(toolkit, privateKey.toString());
	const op = await toolkit.contract.transfer({
		to: transaction.receiver,
		amount: transaction.amount,
	});
	const txHash = await op.confirmation(1).then(() => op.hash);

	return txHash;
};
