import { Networks } from '@walless/core';
import type { MessengerCallback } from '@walless/messaging';
import { RequestType } from '@walless/messaging';

import { handle } from '../utils/handle';
import { getPrivateKeyHandle } from '../utils/middleware';

import * as aptos from './aptos';
import * as common from './common';
import * as solana from './solana';
import * as sui from './sui';
import * as tezos from './tezos';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	const { type, requestId } = payload;

	if (requestId) {
		if (type === RequestType.REQUEST_CONNECT) {
			return handle(payload, common.connect as never);
		} else if (type === RequestType.REQUEST_DISCONNECT) {
			return handle(payload, common.disconnect as never);
		} else if (type === RequestType.REQUEST_PAYLOAD) {
			return handle(payload, common.requestPayload as never);
		} else if (type === RequestType.INSTALL_LAYOUT) {
			return handle(payload, common.installLayout as never);
		} else if (type === RequestType.CHECK_INSTALLED_LAYOUT) {
			return handle(payload, common.checkInstalledLayout as never);
		} else if (type === RequestType.OPEN_LAYOUT_POPUP) {
			return handle(payload, common.openLayoutPopup as never);
		} else if (type === RequestType.SIGN_MESSAGE_ON_SOLANA) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.solana) as never,
				solana.signMessageHandle as never,
			);
		} else if (type === RequestType.SIGN_TRANSACTION_ON_SOLANA) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.solana) as never,
				solana.signTransactionHandle as never,
			);
		} else if (type === RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.solana) as never,
				solana.signAndSendTransactionHandle as never,
			);
		} else if (
			type === RequestType.SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA
		) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.solana) as never,
				solana.signTransactionAbstractionFeeHandle as never,
			);
		} else if (type === RequestType.SIGN_MESSAGE_ON_SUI) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.sui) as never,
				sui.signMessage as never,
			);
		} else if (type === RequestType.SIGN_TRANSACTION_ON_SUI) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.sui) as never,
				sui.signTransaction as never,
			);
		} else if (type === RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.sui) as never,
				sui.signAndExecuteTransaction as never,
			);
		} else if (payload.type === RequestType.TRANSFER_TEZOS_TOKEN) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.tezos) as never,
				tezos.transferToken as never,
			);
		} else if (type === RequestType.TRANSFER_COIN_ON_APTOS) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.aptos) as never,
				aptos.transferCoin as never,
			);
		} else if (type === RequestType.TRANSFER_TOKEN_ON_APTOS) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.aptos) as never,
				aptos.transferToken as never,
			);
		} else if (type === RequestType.CLAIM_TOKEN_ON_APTOS) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.aptos) as never,
				aptos.claimToken as never,
			);
		} else if (type === RequestType.UPDATE_DIRECT_TRANSFER_ON_APTOS) {
			return handle(
				payload,
				getPrivateKeyHandle(Networks.aptos) as never,
				aptos.updateDirectTransfer as never,
			);
		} else {
			return channel.postMessage({
				from: 'walless@kernel',
				requestId: payload.requestId,
				message: 'Invalid request type!',
			});
		}
	}
};
