import type { FC } from 'react';
import type { Networks } from '@walless/core';
import { solMint } from 'utils/constants';
import { useTokens } from 'utils/hooks';

import { gasilonSupportedNetworks } from '../internal';

import { AbstractedTransactionFee } from './AbstractedTransactionFee';
import { NormalTransactionFee } from './NormalTransactionFee';

interface Props {
	network: Networks;
}

export const TransactionFee: FC<Props> = ({ network }) => {
	const { tokens } = useTokens(network);

	const isAbstractFee = gasilonSupportedNetworks.includes(network);
	if (isAbstractFee) {
		const tokenList = tokens;
		const solIndex = tokenList.findIndex(
			(token) => token.account.mint === solMint,
		);
		if (solIndex !== -1) {
			[tokenList[0], tokenList[solIndex]] = [tokenList[solIndex], tokenList[0]];
		}
		return <AbstractedTransactionFee tokenList={tokens} />;
	}

	return <NormalTransactionFee />;
};

export default TransactionFee;
