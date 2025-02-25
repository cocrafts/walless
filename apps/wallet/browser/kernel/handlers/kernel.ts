// import { Networks, RequestType, ResponseCode } from '@walless/core';
// import type { MessengerCallback } from '@walless/messaging';

// import { handle } from '../utils/handle';
// import {
// 	filterSDKSignatureRequest,
// 	forwardToSourceRequest,
// 	getPrivateKey,
// } from '../utils/middleware';
// import { addRequestRecord } from '../utils/requestPool';

// import * as aptos from './aptos';
// import * as common from './common';
// import * as solana from './solana';
// import * as sui from './sui';
// import * as tezos from './tezos';

// export const onKernelMessage: MessengerCallback = async (payload, channel) => {
// addRequestRecord(payload.requestId, channel, payload);
// const { type, requestId } = payload;
// if (!requestId) {
// 	return channel.postMessage({
// 		from: 'walless@kernel',
// 		requestId: requestId,
// 		responseCode: ResponseCode.ERROR,
// 		error: 'No request id provided!',
// 	});
// }
// if (requestId) {
// 	switch (type) {
// 		case RequestType.REQUEST_CONNECT:
// 		case RequestType.REQUEST_DISCONNECT:
// 		case RequestType.REQUEST_PAYLOAD:
// 		case RequestType.SIGN_MESSAGE_ON_SOLANA:
// 			return;
// 	}
// }
// if (type === RequestType.REQUEST_CONNECT && payload.from === 'walless@sdk') {
// 	handle(payload).execute([checkConnection, common.connect]);
// } else if (
// 	type === RequestType.REQUEST_CONNECT &&
// 	payload.from === PopupType.REQUEST_CONNECT_POPUP
// ) {
// 	handle(payload).execute([checkApproval, common.connect]);
// } else if (type === RequestType.REQUEST_DISCONNECT) {
// 	handle(payload).execute([common.disconnect]);
// } else if (type === RequestType.REQUEST_PAYLOAD) {
// 	handle(payload).execute([common.requestPayload]);
// } else if (type === RequestType.INSTALL_LAYOUT) {
// 	handle(payload).execute([common.installLayout]);
// } else if (type === RequestType.CHECK_INSTALLED_LAYOUT) {
// 	handle(payload).execute([common.checkInstalledLayout]);
// } else if (type === RequestType.OPEN_LAYOUT_POPUP) {
// 	handle(payload).execute([common.openLayoutPopup]);
// }
// else if (type === RequestType.SIGN_MESSAGE_ON_SOLANA) {
// 	handle(payload).execute([
// 		filterSDKSignatureRequest,
// 		getPrivateKey(Networks.solana),
// 		forwardToSourceRequest,
// 		solana.signMessage,
// 	]);
// } else if (type === RequestType.SIGN_TRANSACTION_ON_SOLANA) {
// 	handle(payload).execute([
// 		filterSDKSignatureRequest,
// 		getPrivateKey(Networks.solana),
// 		forwardToSourceRequest,
// 		solana.signTransaction,
// 	]);
// } else if (type === RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA) {
// 	handle(payload).execute([
// 		filterSDKSignatureRequest,
// 		getPrivateKey(Networks.solana),
// 		forwardToSourceRequest,
// 		solana.signAndSendTransaction,
// 	]);
// } else if (type === RequestType.SIGN_GASILON_TRANSACTION_ON_SOLANA) {
// 	handle(payload).execute([
// 		getPrivateKey(Networks.solana),
// 		solana.signAndSendGasilonTransaction,
// 	]);
// } else if (type === RequestType.SIGN_MESSAGE_ON_SUI) {
// 	handle(payload).execute([
// 		filterSDKSignatureRequest,
// 		getPrivateKey(Networks.sui),
// 		forwardToSourceRequest,
// 		sui.signMessage,
// 	]);
// } else if (type === RequestType.SIGN_TRANSACTION_ON_SUI) {
// 	handle(payload).execute([
// 		filterSDKSignatureRequest,
// 		getPrivateKey(Networks.sui),
// 		forwardToSourceRequest,
// 		sui.signTransaction,
// 	]);
// } else if (type === RequestType.SIGN_EXECUTE_TRANSACTION_ON_SUI) {
// 	handle(payload).execute([
// 		filterSDKSignatureRequest,
// 		getPrivateKey(Networks.sui),
// 		forwardToSourceRequest,
// 		sui.signAndExecuteTransaction,
// 	]);
// } else if (payload.type === RequestType.TRANSFER_TEZOS_TOKEN) {
// 	handle(payload).execute([
// 		getPrivateKey(Networks.tezos),
// 		tezos.transferToken,
// 	]);
// } else if (type === RequestType.TRANSFER_COIN_ON_APTOS) {
// 	handle(payload).execute([
// 		getPrivateKey(Networks.aptos),
// 		aptos.transferCoin,
// 	]);
// } else if (type === RequestType.TRANSFER_TOKEN_ON_APTOS) {
// 	handle(payload).execute([
// 		getPrivateKey(Networks.aptos),
// 		aptos.transferToken,
// 	]);
// } else if (type === RequestType.CLAIM_TOKEN_ON_APTOS) {
// 	handle(payload).execute([getPrivateKey(Networks.aptos), aptos.claimToken]);
// } else if (type === RequestType.UPDATE_DIRECT_TRANSFER_ON_APTOS) {
// 	handle(payload).execute([
// 		getPrivateKey(Networks.aptos),
// 		aptos.updateDirectTransfer,
// 	]);
// } else {
// 	return channel.postMessage({
// 		from: 'walless@kernel',
// 		requestId: payload.requestId,
// 		responseCode: ResponseCode.ERROR,
// 		error: 'Invalid request type!',
// 	});
// }
// };
