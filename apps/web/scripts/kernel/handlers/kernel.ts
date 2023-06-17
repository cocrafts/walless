import { type MessengerCallback, RequestType } from '@walless/messaging';

import { handleConnect } from './connect';
import * as solanaHandler from './solanaHandler';
import * as suiHandler from './suiHandler';
import * as tezosHanlder from './tezosHandler';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	if (payload.requestId) {
		if (payload.type === RequestType.REQUEST_CONNECT) {
			handleConnect(payload, channel);
		} else if (payload.type == RequestType.GET_ENDPOINT_ON_SOLANA) {
			solanaHandler.getEndpoint(payload, channel);
		} else if (payload.type === RequestType.SIGN_MESSAGE_ON_SOLANA) {
			solanaHandler.handleSignMessage(payload, channel);
		} else if (payload.type === RequestType.SIGN_TRANSACTION_ON_SOLANA) {
			solanaHandler.handleSignTransaction(payload, channel);
		} else if (payload.type === RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA) {
			solanaHandler.handleSignAndSendTransaction(payload, channel);
		} else if (payload.type === RequestType.SIGN_MESSAGE_ON_SUI) {
			suiHandler.handleSignMessage(payload, channel);
		} else if (payload.type === RequestType.SIGN_TRANSACTION_ON_SUI) {
			suiHandler.handleSignTransaction(payload, channel);
		} else if (payload.type === RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI) {
			suiHandler.handleSignAndExecuteTransaction(payload, channel);
		} else if (payload.type === RequestType.TRANSFER_TEZOS_TOKEN) {
			tezosHanlder.handleTransferToken(payload, channel);
		} else {
			return channel.postMessage({
				from: 'walless@kernel',
				requestId: payload.requestId,
				message: 'Invalid request type!',
			});
		}
	}
};
