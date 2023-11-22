import { type FC, useEffect, useState } from 'react';
import type { Networks } from '@walless/core';

import { transactionContext } from '../../../../../state/transaction';
import { useSnapshot, useTokens } from '../../../../../utils/hooks';
import { gasilonSupportedNetworks } from '../../internal';

import { AbstractedTransactionFee } from './AbstractedTransactionFee';
import { NormalTrasactionFee } from './NormalTransactionFee';

interface Props {
	network?: Networks;
}

export const TransactionFee: FC<Props> = ({ network }) => {
	const [isAbstractFee, setIsAbstractFee] = useState(false);
	const { token } = useSnapshot(transactionContext);
	const { tokens } = useTokens(network || token?.network);

	useEffect(() => {
		if (network || token?.network) {
			if (gasilonSupportedNetworks.includes(network ?? token?.network))
				setIsAbstractFee(true);
		}
	}, [token]);

	return isAbstractFee ? (
		<AbstractedTransactionFee tokenList={tokens} />
	) : (
		<NormalTrasactionFee />
	);
};

export default TransactionFee;
