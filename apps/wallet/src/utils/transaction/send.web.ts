import { PublicKey } from '@solana/web3.js';
import { Networks, RequestType } from '@walless/core';
import { solana } from '@walless/network';
import { sendRequest } from 'bridge';
import { encode } from 'bs58';
import { engine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { solMint } from 'utils/constants';

import {
	constructSolanaSendNftTransaction,
	constructSolanaSendTokenTransaction,
} from './construct';
import { getGasilonConfig } from './gasilon';
import type {
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
} from './types';

export const createAndSendSolanaTransaction = async (
	initTransaction: SolanaSendTokenTransaction | SolanaSendNftTransaction,
	passcode: string,
) => {
	const { type } = initTransaction;
	let transaction;
	if (type === 'token') {
		transaction = await constructSolanaSendTokenTransaction(
			initTransaction as SolanaSendTokenTransaction,
		);
	} else {
		transaction = await constructSolanaSendNftTransaction(
			initTransaction as SolanaSendNftTransaction,
		);
	}
	if (!transaction) throw Error('failed to construct transaction');

	const { tokenForFee } = initTransaction as SolanaSendTransaction;
	const isGasilon = tokenForFee && tokenForFee.mint !== solMint;
	if (isGasilon) {
		const { sender, tokenForFee, fee } = initTransaction;
		const config = await getGasilonConfig();
		if (!config) throw Error('Gasilon is not available');
		transaction = await solana.withGasilon(transaction, {
			sender: new PublicKey(sender),
			feeAmount: Math.round(fee * 10 ** tokenForFee.decimals),
			feeMint: new PublicKey(tokenForFee.mint),
			feePayer: new PublicKey(config.feePayer),
		});

		const { connection } = engine.getContext<SolanaContext>(Networks.solana);
		transaction = await solana.withSetComputeUnitPrice(transaction, connection);

		return await sendRequest({
			type: RequestType.SIGN_GASILON_TRANSACTION_ON_SOLANA,
			transaction: encode(
				transaction.serialize({
					requireAllSignatures: false,
				}),
			),
			passcode,
		});
	} else {
		const { connection } = engine.getContext<SolanaContext>(Networks.solana);
		transaction = await solana.withSetComputeUnitPrice(transaction, connection);
		return await sendRequest(
			{
				type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
				transaction: encode(transaction.serialize()),
				passcode,
			},
			1000 * 60 * 5,
		);
	}
};

export const handleAptosOnChainAction = async ({
	passcode,
	payload,
	type,
}: {
	passcode: string;
	type: RequestType;
	payload: unknown;
}) => {
	const res = await sendRequest({
		type,
		transaction: JSON.stringify(payload),
		passcode,
	});

	return res;
};
