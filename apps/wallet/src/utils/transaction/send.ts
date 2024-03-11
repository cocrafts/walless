import type { VersionedTransaction } from '@solana/web3.js';
import { logger, Networks, RequestType, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { aptos, solana, utils } from '@walless/network';
import { getDefaultEngine } from 'engine';
import type { AptosContext, SolanaContext } from 'engine/runners';
import { environment } from 'utils/config';
import { solMint } from 'utils/constants';
import { storage } from 'utils/storage';

import {
	constructSolanaSendNftTransaction,
	constructSolanaSendTokenTransaction,
} from './construct';
import type {
	SendNftTransaction,
	SendTokenTransaction,
	SendTransaction,
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
} from './types';

export const sendTransaction = async (
	initTransaction:
		| SendTransaction
		| SendTokenTransaction
		| SendNftTransaction
		| SolanaSendTransaction,
	passcode?: string,
): Promise<ResponsePayload> => {
	const res = {} as ResponsePayload;
	if (!passcode) {
		res.responseCode = ResponseCode.REQUIRE_PASSCODE;
		return res;
	}

	const { network, type } = initTransaction;

	switch (network) {
		case Networks.solana: {
			const transaction =
				type === 'token'
					? await constructSolanaSendTokenTransaction(
							initTransaction as SolanaSendTokenTransaction,
						)
					: await constructSolanaSendNftTransaction(
							initTransaction as SolanaSendNftTransaction,
						);
			if (!transaction) throw Error('failed to construct transaction');

			const { tokenForFee } = initTransaction as SolanaSendTransaction;
			const isGasilon = tokenForFee && tokenForFee.mint !== solMint;

			return await sendSolanaTransaction(
				transaction,
				passcode,
				isGasilon ? 'gasilon' : 'default',
			);
		}
		case Networks.sui: {
			// TODO: implement transfer sui
			logger.debug('hello sui');
			break;
		}
		case Networks.tezos: {
			// TODO: implement transfer tezos
			logger.debug('hello tezos');
			break;
		}
		case Networks.aptos: {
			// TODO: implement transfer tezos
			logger.debug('hello aptos');
			break;
		}
	}

	return res;
};

const sendSolanaTransaction = async (
	transaction: VersionedTransaction,
	passcode: string,
	type: 'default' | 'gasilon' = 'default',
) => {
	const res = {} as ResponsePayload;
	let privateKey;
	try {
		privateKey = await utils.getPrivateKey(storage, Networks.solana, passcode);
	} catch {
		res.responseCode = ResponseCode.WRONG_PASSCODE;
		return res;
	}

	if (type === 'gasilon') {
		const gasilonEndpoint = environment.GASILON_ENDPOINT;
		res.signatureString = await solana.signAndSendTransactionAbstractionFee(
			gasilonEndpoint,
			transaction,
			privateKey,
		);
	} else {
		const engine = getDefaultEngine();
		const { connection } = engine.getContext<SolanaContext>(Networks.solana);
		res.signatureString = await solana.signAndSendTransaction(
			connection,
			transaction,
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

	const engine = getDefaultEngine();
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
		const engine = getDefaultEngine();
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
