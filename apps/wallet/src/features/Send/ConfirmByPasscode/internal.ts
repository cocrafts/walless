import { ResponseCode } from '@walless/core';
import { showError } from 'modals/Error';
import { sendTransaction } from 'utils/transaction';
import { hasEnoughBalanceToMakeTx } from 'utils/transaction/fee';

import type {
	NftTransactionContext,
	SolanaTransactionContext,
	TokenTransactionContext,
} from '../internal';
import { txActions, txContext } from '../internal';

export const handleSendTransaction = async (passcode: string) => {
	const { type, sender, receiver, network, amount, tokenForFee } = txContext.tx;
	let transaction;
	if (type === 'token') {
		const { token } = txContext.tx as TokenTransactionContext;
		transaction = {
			type,
			sender,
			receiver,
			network,
			amount: Number(amount),
			token,
			...{ tokenForFee },
		};
	} else {
		const { nft } = txContext.tx as NftTransactionContext;
		transaction = {
			type,
			sender,
			receiver,
			network,
			amount: Number(amount),
			nft,
			...{ tokenForFee },
		};
	}

	const hasEnoughBalance = await hasEnoughBalanceToMakeTx(transaction);

	if (!hasEnoughBalance) {
		showError({ errorText: 'Insufficient balance to send' });
		return;
	}

	const res = await sendTransaction(transaction, passcode);

	if (res.responseCode == ResponseCode.WRONG_PASSCODE) {
		showError({ errorText: 'Passcode is NOT matched' });
	} else if (res.responseCode == ResponseCode.SUCCESS) {
		const signature =
			res.signatureString || res.signedTransaction?.digest || res.hash;
		txActions.update<SolanaTransactionContext>({ signature });
	}

	txActions.update({ time: new Date() });
	txActions.update({
		status: res.responseCode === ResponseCode.SUCCESS ? 'success' : 'failed',
	});
};
