import type { VersionedTransaction } from '@solana/web3.js';
import { Networks, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { solanaHandler, utils } from '@walless/network';
import { engine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { storage } from 'utils/storage';

export const signAndSendTransaction = async (
	transaction: VersionedTransaction,
	passcode: string,
	options?: solanaHandler.SignAndSendOptions,
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
	res.signatureString = await solanaHandler.signAndSendTransaction(
		connection,
		transaction,
		privateKey,
		options,
	);

	return res;
};
