import { PublicKey } from '@solana/web3.js';
import { Networks, RequestType, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { aptos, solana, sui, utils } from '@walless/network';
import { engine } from 'engine';
import type { AptosContext, SolanaContext, SuiContext } from 'engine/runners';
import { environment } from 'utils/config';
import { solMint } from 'utils/constants';
import { storage } from 'utils/storage';

import {
	constructSolanaSendNftTransaction,
	constructSolanaSendTokenTransaction,
	constructSuiSendTokenTransaction,
} from './construct';
import { getGasilonConfig } from './gasilon';
import type {
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
	SuiSendTokenTransaction,
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

export const sendAptosTransaction = async (
	transaction: aptos.AptosCoinPayload | aptos.AptosTokenPayload,
	passcode: string,
) => {
	const res = {} as ResponsePayload;

	let privateKey;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.aptos, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	const isCoinTransaction = !('creator' in transaction);

	const { provider } = engine.getContext<AptosContext>(Networks.aptos);
	if (isCoinTransaction) {
		res.signatureString = await aptos.handleTransferCoin(
			provider,
			privateKey,
			transaction,
		);
	} else {
		res.signatureString = await aptos.handleTransferToken(
			provider,
			privateKey,
			transaction,
		);
	}

	res.responseCode = ResponseCode.SUCCESS;

	return res;
};
export const handleAptosOnChainAction = async ({
	passcode,
	type,
	payload,
}: {
	passcode: string;
	type: RequestType;
	payload: unknown;
}) => {
	const res = {} as ResponsePayload;

	let privateKey;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.aptos, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	try {
		const { provider } = engine.getContext<AptosContext>(Networks.aptos);
		switch (type) {
			case RequestType.UPDATE_DIRECT_TRANSFER_ON_APTOS:
				res.signatureString = await aptos.handleUpdateDirectTransfer(
					provider,
					privateKey,
					payload as aptos.AptosDirectTransferPayload,
				);
				break;

			case RequestType.CLAIM_TOKEN_ON_APTOS:
				res.signatureString = await aptos.handleClaimToken(
					provider,
					privateKey,
					payload as aptos.AptosClaimTokenPayload,
				);
				break;

			default:
				break;
		}

		res.responseCode = ResponseCode.SUCCESS;
	} catch {
		res.responseCode = ResponseCode.ERROR;
	}

	return res;
};

export const createAndSendSuiTransaction = async (
	initTransaction: SuiSendTokenTransaction,
	passcode: string,
) => {
	const res = {} as ResponsePayload;
	let privateKey: Uint8Array;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.sui, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	const transactionBlock =
		await constructSuiSendTokenTransaction(initTransaction);
	const { client } = engine.getContext<SuiContext>(Networks.sui);
	const response = await sui.signAndExecuteTransaction(
		client,
		transactionBlock.serialize(),
		privateKey,
	);
	res.signatureString = response.transaction?.txSignatures;
	res.responseCode = ResponseCode.SUCCESS;

	return res;
};
