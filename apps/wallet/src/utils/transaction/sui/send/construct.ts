import type { SuiClient } from '@mysten/sui.js/dist/cjs/client';
import { sui } from '@walless/network';
import type { SuiSendTokenTransaction } from 'utils/transaction/types';

export const constructSuiSendTokenTransaction = async (
	client: SuiClient,
	initTransaction: SuiSendTokenTransaction,
) => {
	const { tokenForFee, amount, receiver, sender, token } = initTransaction;
	return sui.constructSuiTransactionBlock(
		client,
		token.coinType,
		token.decimals,
		tokenForFee.coinType,
		amount,
		receiver,
		sender,
	);
};
