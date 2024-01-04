import type { FC } from 'react';
import { useTokens } from '@walless/app';
import type { Networks } from '@walless/core';

import { gasilonSupportedNetworks } from '../internal';

import { AbstractedTransactionFee } from './AbstractedTransactionFee';
import { NormalTransactionFee } from './NormalTransactionFee';

interface Props {
	network: Networks;
}

export const TransactionFee: FC<Props> = ({ network }) => {
	const { tokens } = useTokens(network);
	const isAbstractFee = gasilonSupportedNetworks.includes(network);

	return isAbstractFee ? (
		<AbstractedTransactionFee tokenList={tokens} />
	) : (
		<NormalTransactionFee />
	);
};

export default TransactionFee;
