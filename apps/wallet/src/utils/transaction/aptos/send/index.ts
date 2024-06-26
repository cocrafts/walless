import { Networks, RequestType, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { aptos, utils } from '@walless/network';
import { engine } from 'engine';
import type { AptosContext } from 'engine/runners';
import { storage } from 'utils/storage';

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
