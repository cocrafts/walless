import type { FC } from 'react';

import { useTransactionContext } from '../../internal';
import { gasilonSupportedNetworks } from '../internal';

import { AbstractedTransactionFee } from './AbstractedTransactionFee';
import { NormalTransactionFee } from './NormalTransactionFee';

export const TransactionFee: FC = () => {
	const { network } = useTransactionContext();
	const isAbstractFee = gasilonSupportedNetworks.includes(network);

	return isAbstractFee ? (
		<AbstractedTransactionFee />
	) : (
		<NormalTransactionFee />
	);
};

export default TransactionFee;
