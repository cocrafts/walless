import { MessengerCallback } from '@walless/messaging';

import { fetchAllCollectibles, fetchAllTokens } from '../utils/query';

import { handleConnect } from './connect';
import {
	handleSignAllTransaction,
	handleSignMessage,
	handleSignTransaction,
} from './sign';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	console.log('onKernelMessage');
	if (payload.requestId) {
		if (payload.type === 'request-connect') {
			console.log('helloworld');
			await handleConnect(payload, channel);
		} else if (payload.type === 'sign-transaction') {
			await handleSignTransaction(payload, channel);
		} else if (payload.type === 'sign-all-transactions') {
			await handleSignAllTransaction(payload, channel);
		} else if (payload.type === 'sign-message') {
			await handleSignMessage(payload, channel);
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
