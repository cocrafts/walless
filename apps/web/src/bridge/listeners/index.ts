import { VersionedTransaction } from '@solana/web3.js';
import { encryptedMessenger } from 'bridge/utils/messaging';
import { encode } from 'bs58';

export const registerMessageHandlers = async () => {
	setTimeout(async () => {
		await encryptedMessenger.send('kernel', { type: 'notify-wallet-open' });
	}, 50);
};

export const requestSignAndSendTransaction = async (
	transaction: VersionedTransaction,
	options: unknown = undefined,
	passcode: string | undefined = undefined,
) => {
	try {
		const res = await encryptedMessenger.request('kernel', {
			type: 'sign-and-send-transaction',
			transaction: encode(transaction.serialize()),
			options,
			passcode,
		});
		return res;
	} catch (error) {
		return {
			message: (error as Error).message,
		};
	}
};
