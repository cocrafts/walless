import { importKey } from '@taquito/signer';
import type { TezosToolkit } from '@taquito/taquito';
import type { TezosTransaction } from '@walless/core';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';

export const handleTransferToken = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const transaction: TezosTransaction = JSON.parse(transactionStr);
	if (transaction.type !== 'native') {
		throw Error('Not support this token');
	}

	const tezos: TezosToolkit = modules.engine.getConnection(Networks.tezos);
	await importKey(tezos, privateKey.toString());
	const op = await tezos.contract.transfer({
		to: transaction.receiver,
		amount: transaction.amount,
	});
	const txHash = await op.confirmation(1).then(() => op.hash);

	return txHash;
};
