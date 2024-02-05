import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import type { TransactionPayload } from '@walless/core';
import { logger, Networks, RequestType, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { aptosHandler, solanaHandler, utils } from '@walless/network';
import { engine } from 'engine';
import type { AptosContext, SolanaContext } from 'engine/runners';
import { environment } from 'utils/config';
import { storage } from 'utils/storage';

import {
	constructTransaction,
	constructTransactionAbstractFee,
} from './common';

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const res = {} as ResponsePayload;
	if (!passcode) {
		res.responseCode = ResponseCode.REQUIRE_PASSCODE;
		return res;
	}

	const transaction =
		payload.tokenForFee.metadata?.symbol === 'SOL'
			? await constructTransaction(payload)
			: await constructTransactionAbstractFee(payload);

	if (transaction instanceof VersionedTransaction) {
		let privateKey;
		try {
			privateKey = await utils.getPrivateKey(
				storage,
				Networks.solana,
				passcode,
			);
		} catch {
			res.responseCode = ResponseCode.WRONG_PASSCODE;
			return res;
		}

		// eslint-disable-next-line no-useless-catch
		try {
			if (payload.tokenForFee.metadata?.symbol === 'SOL') {
				const { connection } = engine.getContext<SolanaContext>(
					Networks.solana,
				);
				res.signatureString = await solanaHandler.signAndSendTransaction(
					connection,
					transaction,
					privateKey,
				);
			} else {
				res.signatureString =
					await solanaHandler.signAndSendTransactionAbstractionFee(
						environment.GASILON_ENDPOINT,
						transaction,
						privateKey,
					);
			}

			res.responseCode = ResponseCode.SUCCESS;
		} catch (error) {
			throw error;
		}
	} else if (transaction instanceof TransactionBlock) {
		// TODO: implement transfer sui
		logger.debug('hello sui');
	} else if (payload.network == Networks.tezos) {
		// TODO: implement transfer tezos
		logger.debug('hello tezos');
	} else if (payload.network === Networks.aptos) {
		let privateKey;
		try {
			privateKey = await utils.getPrivateKey(storage, Networks.aptos, passcode);
		} catch {
			res.responseCode = ResponseCode.WRONG_PASSCODE;
			return res;
		}

		const isCoinTransaction = !('creator' in transaction);

		try {
			const { provider } = engine.getContext<AptosContext>(Networks.aptos);
			if (isCoinTransaction) {
				res.signatureString = await aptosHandler.handleTransferCoin(
					provider,
					privateKey,
					transaction as aptosHandler.AptosCoinPayload,
				);
			} else {
				res.signatureString = await aptosHandler.handleTransferToken(
					provider,
					privateKey,
					transaction as aptosHandler.AptosTokenPayload,
				);
			}
			res.responseCode = ResponseCode.SUCCESS;
		} catch {
			res.responseCode = ResponseCode.ERROR;
			return res;
		}
	}

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
				res.signatureString = await aptosHandler.handleUpdateDirectTransfer(
					provider,
					privateKey,
					payload as aptosHandler.AptosDirectTransferPayload,
				);
				break;

			case RequestType.CLAIM_TOKEN_ON_APTOS:
				res.signatureString = await aptosHandler.handleClaimToken(
					provider,
					privateKey,
					payload as aptosHandler.AptosClaimTokenPayload,
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
