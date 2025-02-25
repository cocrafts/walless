import { PublicKey } from '@metaplex-foundation/js';
import type { VersionedTransaction } from '@solana/web3.js';
import { Networks, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { solana, utils } from '@walless/network';
import { engine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { environment } from 'utils/config';
import { solMint } from 'utils/constants';
import { storage } from 'utils/storage';
import { getGasilonConfig } from 'utils/transaction/gasilon';
import type {
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
} from 'utils/transaction/types';

import {
	constructSolanaSendNftTransaction,
	constructSolanaSendTokenTransaction,
} from './construct';

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
	transaction = await solana.withSetComputeUnitPrice(transaction);

	const res = {} as ResponsePayload;
	let privateKey;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.solana, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

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

		const gasilonEndpoint = environment.GASILON_ENDPOINT;
		res.signatureString = await solana.signAndSendGasilonTransaction(
			gasilonEndpoint,
			transaction,
			privateKey,
		);
	} else {
		const { connection } = engine.getContext<SolanaContext>(Networks.solana);
		res.signatureString = await solana.signAndSendTransaction(
			connection,
			// TODO: support legacy transaction
			transaction as never,
			privateKey,
		);
	}
	res.responseCode = ResponseCode.SUCCESS;

	return res;
};

export const signAndSendTransaction = async (
	transaction: VersionedTransaction,
	passcode: string,
	options?: solana.SignAndSendOptions,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	timeout?: number,
): Promise<ResponsePayload> => {
	const res = {} as ResponsePayload;
	let privateKey;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.solana, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	const { connection } = engine.getContext<SolanaContext>(Networks.solana);
	res.signatureString = await solana.signAndSendTransaction(
		connection,
		transaction,
		privateKey,
		options,
	);

	return res;
};

export * from './construct';
export * from './fee';
