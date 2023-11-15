import { Networks } from '@walless/core';
import type { MessengerCallback } from '@walless/messaging';
import { PopupType, RequestType, ResponseCode } from '@walless/messaging';

import { handle } from '../utils/handle';
import {
	checkApproval,
	checkConnection,
	getPrivateKey,
} from '../utils/middleware';
import { addRequestRecord } from '../utils/requestPool';

import * as aptos from './aptos';
import * as common from './common';
import * as solana from './solana';
import * as sui from './sui';
import * as tezos from './tezos';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	addRequestRecord(payload.requestId, channel, payload);
	const { type, requestId } = payload;

	if (!requestId) {
		return channel.postMessage({
			from: 'walless@kernel',
			requestId: requestId,
			responseCode: ResponseCode.ERROR,
			error: 'No request id provided!',
		});
	}

	if (type === RequestType.REQUEST_CONNECT) {
		if (payload.from === 'walless@sdk') {
			handle(payload, checkConnection, common.connect);
		} else if (payload.from === PopupType.REQUEST_CONNECT_POPUP) {
			handle(payload, checkApproval, common.connect);
		}
	} else if (type === RequestType.REQUEST_DISCONNECT) {
		handle(payload, common.disconnect);
	} else if (type === RequestType.REQUEST_PAYLOAD) {
		handle(payload, common.requestPayload);
	} else if (type === RequestType.INSTALL_LAYOUT) {
		handle(payload, common.installLayout);
	} else if (type === RequestType.CHECK_INSTALLED_LAYOUT) {
		handle(payload, common.checkInstalledLayout);
	} else if (type === RequestType.OPEN_LAYOUT_POPUP) {
		handle(payload, common.openLayoutPopup);
	} else if (type === RequestType.SIGN_MESSAGE_ON_SOLANA) {
		handle(payload, getPrivateKey(Networks.solana), solana.signMessage);
	} else if (type === RequestType.SIGN_TRANSACTION_ON_SOLANA) {
		handle(payload, getPrivateKey(Networks.solana), solana.signTransaction);
	} else if (type === RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA) {
		handle(
			payload,
			getPrivateKey(Networks.solana),
			solana.signAndSendTransaction,
		);
	} else if (type === RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA) {
		handle(
			payload,
			getPrivateKey(Networks.solana),
			solana.signTransactionAbstractionFee,
		);
	} else if (type === RequestType.SIGN_MESSAGE_ON_SUI) {
		handle(payload, getPrivateKey(Networks.sui), sui.signMessage);
	} else if (type === RequestType.SIGN_TRANSACTION_ON_SUI) {
		handle(payload, getPrivateKey(Networks.sui), sui.signTransaction);
	} else if (type === RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI) {
		handle(payload, getPrivateKey(Networks.sui), sui.signAndExecuteTransaction);
	} else if (payload.type === RequestType.TRANSFER_TEZOS_TOKEN) {
		handle(payload, getPrivateKey(Networks.tezos), tezos.transferToken);
	} else if (type === RequestType.TRANSFER_COIN_ON_APTOS) {
		handle(payload, getPrivateKey(Networks.aptos), aptos.transferCoin);
	} else if (type === RequestType.TRANSFER_TOKEN_ON_APTOS) {
		handle(payload, getPrivateKey(Networks.aptos), aptos.transferToken);
	} else if (type === RequestType.CLAIM_TOKEN_ON_APTOS) {
		handle(payload, getPrivateKey(Networks.aptos), aptos.claimToken);
	} else if (type === RequestType.UPDATE_DIRECT_TRANSFER_ON_APTOS) {
		handle(payload, getPrivateKey(Networks.aptos), aptos.updateDirectTransfer);
	} else {
		return channel.postMessage({
			from: 'walless@kernel',
			requestId: payload.requestId,
			responseCode: ResponseCode.ERROR,
			error: 'Invalid request type!',
		});
	}
};
