import { Networks } from '@walless/core';
import { FC } from 'react';
import { gasilonSupportedNetworks } from '../../internal';
import { AbstractedTransactionFee } from './AbstractedTransactionFee';
import { NormalTrasactionFee } from './NormalTransactionFee';

interface Props {
	network: Networks;
}

export const TransactionFee: FC<Props> = ({ network }) => {
	return gasilonSupportedNetworks.includes(network) ? (
		<AbstractedTransactionFee />
	) : (
		<NormalTrasactionFee />
	);
};

export default TransactionFee;
