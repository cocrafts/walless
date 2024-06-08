import type { TezosToolkit } from '@taquito/taquito';
import type { TezosSendTokenTransaction } from 'utils/transaction/types';

import { getTransferParams } from './internal';
export const getTezosTransactionFee = async (
	payload: TezosSendTokenTransaction,
	connection: TezosToolkit,
) => {
	const transferParams = await getTransferParams(payload, connection);
	const estmtn = await connection.estimate.transfer(transferParams);

	return estmtn.suggestedFeeMutez;
};
