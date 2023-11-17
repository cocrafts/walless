import { TransactionBlock } from '@mysten/sui.js';
import { VersionedTransaction } from '@solana/web3.js';
import {
	constructTransaction,
	constructTransactionAbstractFee,
} from '@walless/app/utils';
import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { CreateAndSendFunction, HandleAptosFunction } from '@walless/ioc';
import { aptosHandler, solanaHandler, utils } from '@walless/kernel';
import type { ResponsePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';

export const createAndSend: CreateAndSendFunction = async (
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
			privateKey = await utils.getPrivateKey(Networks.solana, passcode);
		} catch {
			res.responseCode = ResponseCode.WRONG_PASSCODE;
			return res;
		}

		try {
			if (payload.tokenForFee.metadata?.symbol === 'SOL') {
				res.signatureString = await solanaHandler.signAndSendTransaction(
					transaction,
					privateKey,
				);
			} else {
				res.signatureString =
					await solanaHandler.signAndSendTransactionAbstractionFee(
						transaction,
						privateKey,
					);
			}

			res.responseCode = ResponseCode.SUCCESS;
		} catch {
			res.responseCode = ResponseCode.ERROR;
			return res;
		}
	} else if (transaction instanceof TransactionBlock) {
		// TODO: implement transfer sui
		console.log('hello sui');
	} else if (payload.network == Networks.tezos) {
		// TODO: implement transfer tezos
		console.log('hello tezos');
	} else if (payload.network === Networks.aptos) {
		let privateKey;
		try {
			privateKey = await utils.getPrivateKey(Networks.aptos, passcode);
		} catch {
			res.responseCode = ResponseCode.WRONG_PASSCODE;
			return res;
		}

		const isCoinTransaction = !('creator' in transaction);

		try {
			if (isCoinTransaction) {
				res.signatureString = await aptosHandler.handleTransferCoin(
					privateKey,
					transaction as aptosHandler.AptosCoinPayload,
				);
			} else {
				res.signatureString = await aptosHandler.handleTransferToken(
					privateKey,
					transaction as aptosHandler.AptosTokenPayload,
				);
			}
			res.responseCode = ResponseCode.SUCCESS;
		} catch (error) {
			res.responseCode = ResponseCode.ERROR;
			return res;
		}
	}

	return res;
};

export const handleAptosFunction: HandleAptosFunction = async (
	passcode,
	payload,
	callback,
) => {
	const res = {} as ResponsePayload;

	let privateKey;
	try {
		privateKey = await utils.getPrivateKey(Networks.aptos, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	try {
		res.signatureString = await callback(privateKey, payload);
		res.responseCode = ResponseCode.SUCCESS;
	} catch (error) {
		res.responseCode = ResponseCode.ERROR;
	}

	return res;
};
