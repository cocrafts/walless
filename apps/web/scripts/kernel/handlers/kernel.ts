import type { MessengerCallback } from '@walless/messaging';
import { RequestType } from '@walless/messaging';

import { handle } from '../utils/coordinator';
import { getNetwork } from '../utils/handler';

import * as aptosHandler from './aptosHandler';
import * as commonHandler from './common';
import * as solanaHandler from './solanaHandler';
import * as suiHandler from './suiHandler';
import * as tezosHandler from './tezosHandler';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	const { type, requestId } = payload;

	if (requestId) {
		let handleMethod;
		let requirePrivateKey = true;
		let requireUserAction = true;

		switch (type) {
			case RequestType.REQUEST_CONNECT:
				handleMethod = commonHandler.handleConnect;
				requirePrivateKey = false;
				break;
			case RequestType.REQUEST_DISCONNECT:
				handleMethod = commonHandler.handleDisconnect;
				requirePrivateKey = false;
				requireUserAction = false;
				break;
			case RequestType.GET_ENDPOINT_ON_SOLANA:
				solanaHandler.getEndpoint(payload, channel);
				requirePrivateKey = false;
				break;
			case RequestType.REQUEST_PAYLOAD:
				handleMethod = commonHandler.handleRequestPayload;
				requirePrivateKey = false;
				break;
			case RequestType.INSTALL_LAYOUT:
				handleMethod = commonHandler.handleInstallLayout;
				requirePrivateKey = false;
				break;
			case RequestType.CHECK_INSTALLED_LAYOUT:
				handleMethod = commonHandler.handleCheckInstalledLayout;
				requirePrivateKey = false;
				requireUserAction = false;
				break;
			case RequestType.OPEN_LAYOUT_POPUP:
				handleMethod = commonHandler.handleOpenLayoutPopup;
				requirePrivateKey = false;
				requireUserAction = false;
				break;
			case RequestType.SIGN_MESSAGE_ON_SOLANA:
				handleMethod = solanaHandler.signMessage;
				break;
			case RequestType.SIGN_TRANSACTION_ON_SOLANA:
				handleMethod = solanaHandler.signTransaction;
				break;
			case RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA:
				handleMethod = solanaHandler.signAndSendTransaction;
				break;
			case RequestType.SIGN_MESSAGE_ON_SUI:
				suiHandler.handleSignMessage(payload, channel);
				break;
			case RequestType.SIGN_TRANSACTION_ON_SUI:
				suiHandler.handleSignTransaction(payload, channel);
				break;
			case RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI:
				suiHandler.handleSignAndExecuteTransaction(payload, channel);
				break;
			case RequestType.TRANSFER_TEZOS_TOKEN:
				tezosHandler.handleTransferToken(payload, channel);
				break;
			case RequestType.TRANSFER_APTOS_COIN:
				handleMethod = aptosHandler.handleTransferCoin;
				break;
			case RequestType.UPDATE_APTOS_DIRECT_TRANSFER:
				handleMethod = aptosHandler.handleUpdateDirectTransfer;
				break;
			default:
				return channel.postMessage({
					from: 'walless@kernel',
					requestId: payload.requestId,
					message: 'Invalid request type!',
				});
		}

		const network = getNetwork(type);

		if (handleMethod)
			handle({
				channel,
				payload,
				handleMethod,
				requirePrivateKey,
				requireUserAction,
				network,
			});
	}
};
