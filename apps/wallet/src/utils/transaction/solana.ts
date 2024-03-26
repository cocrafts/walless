import type { VersionedTransaction } from '@solana/web3.js';
import { Networks, ResponseCode } from '@walless/core';
import type { ResponsePayload } from '@walless/messaging';
import { solana, utils } from '@walless/network';
import { engine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { storage } from 'utils/storage';

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
