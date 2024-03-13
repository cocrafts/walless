import type { FC } from 'react';
import { gasilonSupportedNetworks } from 'utils/transaction';

import { useTransactionContext } from '../../internal';

import { DefaultTransactionFee } from './DefaultFee';
import { GasilonTransactionFee } from './GasilonFee';

export const TransactionFee: FC = () => {
	const { network } = useTransactionContext();
	const useGasilonFee = network && gasilonSupportedNetworks.includes(network);

	return useGasilonFee ? <GasilonTransactionFee /> : <DefaultTransactionFee />;
};

export default TransactionFee;
