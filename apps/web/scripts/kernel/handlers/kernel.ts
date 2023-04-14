import { MessengerCallback } from '@walless/messaging';

import { fetchAllCollectibles, fetchAllTokens } from '../utils/query';

import { handleConnect } from './connect';
import * as solanaHandler from './solanaHandler';
import * as suiHandler from './suiHandler';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	if (payload.requestId) {
		if (payload.type === 'request-connect') {
			await handleConnect(payload, channel);
		} else if (payload.type === 'sign-transaction') {
			await solanaHandler.handleSignTransaction(payload, channel);
		} else if (payload.type === 'sign-all-transactions') {
			await solanaHandler.handleSignAllTransaction(payload, channel);
		} else if (payload.type === 'sign-message') {
			await solanaHandler.handleSignMessage(payload, channel);
		} else if (payload.type === 'sign-and-send-transaction') {
			await solanaHandler.handleSignAndSendTransaction(payload, channel);
		} else if (payload.type === 'sign-message-on-sui') {
			await suiHandler.handleSignMessage(payload, channel);
		} else if (payload.type === 'sign-transaction-on-sui') {
			await suiHandler.handleSignTransaction(payload, channel);
		} else if (payload.type === 'sign-and-execute=transaction-on-sui') {
			await suiHandler.handleSignAndExecuteTransaction(payload, channel);
		}
	} else {
		if (payload.type === 'notify-wallet-open') {
			const { collectibles, collections } = await fetchAllCollectibles();

			console.log(collectibles, 'collectibles');
			console.log(collections, 'collections');

			const wallets = await fetchAllTokens();
			console.log(wallets, 'wallets');
		}
	}
};
