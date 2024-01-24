import { importKey } from '@taquito/signer';
import type { TezosToolkit } from '@taquito/taquito';
import type { TezosTransaction } from '@walless/sdk';

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
