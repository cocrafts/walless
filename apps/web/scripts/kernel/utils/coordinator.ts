import {
	type ConnectOptions,
	type MiniBroadcast,
	type Networks,
	type UnknownObject,
} from '@walless/core';
import { modules } from '@walless/ioc';
import { PopupType, ResponseCode, ResponseMessage } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import { type TrustedDomainDocument, selectors } from '@walless/store';

import { getPrivateKey } from './handler';
import {
	addRequestRecord,
	getRequestRecord,
	removeRequestRecord,
	response,
} from './requestPool';
import { openPopup } from './shared';
import { type HandleMethod } from './types';

export const handle = async (
	channel: MiniBroadcast,
	payload: UnknownObject,
	handleMethod: HandleMethod,
	requirePrivateKey = true,
	network?: Networks,
) => {
	const { from, type, requestId, sourceRequestId, passcode, isApproved } =
		payload;
	addRequestRecord(requestId, channel, payload);

	if (from == 'walless@sdk') {
		const requestSource = getRequestRecord(requestId);
		if (type === RequestType.REQUEST_CONNECT) {
			const { options = {}, requestId = '' } = payload;
			const { onlyIfTrusted, domain } = options as ConnectOptions;

			const domainResponse = await modules.storage.find(
				selectors.trustedDomains,
			);
			const trustedDomains = domainResponse.docs as TrustedDomainDocument[];

			if (onlyIfTrusted) {
				const savedDomain = trustedDomains.find(({ _id }) => _id == domain);

				if (!savedDomain) {
					const { id } = await openPopup(
						PopupType.REQUEST_CONNECT_POPUP,
						requestId,
					);
					requestSource.payload['popupId'] = id;
				} else if (!savedDomain.trusted) {
					return response(requestId, ResponseCode.REJECTED, {
						message: ResponseMessage.REJECT_REQUEST_CONNECT,
					});
				}
			}
		} else {
			const { id } = await openPopup(PopupType.SIGNATURE_POPUP, requestId);
			requestSource.payload['popupId'] = id;
		}
		return;
	} else if (from === PopupType.REQUEST_CONNECT_POPUP) {
		/**
		 * Forwarded request
		 * */
		if (!isApproved) {
			response(sourceRequestId, ResponseCode.REJECTED, {
				message: ResponseMessage.REJECT_REQUEST_CONNECT,
			});

			return removeRequestRecord(requestId);
		}

		// Forward payload from source request to current request
		payload = getRequestRecord(sourceRequestId).payload;
	} else if (from === PopupType.SIGNATURE_POPUP) {
		/**
		 * Forwarded request
		 * */
		if (!isApproved) {
			response(sourceRequestId, ResponseCode.REJECTED, {
				message: ResponseMessage.REJECT_COMMON_REQUEST,
			});

			return removeRequestRecord(requestId);
		}

		// Forward payload from source request to current request
		payload = getRequestRecord(sourceRequestId).payload;
	}

	// Normal flow
	let privateKey;
	if (requirePrivateKey) {
		if (!passcode) return response(requestId, ResponseCode.REQUIRE_PASSCODE);

		try {
			privateKey = await getPrivateKey(network as Networks, passcode);
		} catch (error) {
			return response(requestId, ResponseCode.WRONG_PASSCODE);
		}
	}

	handleMethod({
		privateKey: privateKey || new Uint8Array(),
		payload: payload,
		responseMethod: response,
	});
};

export const handleRequestPayload = (
	payload: UnknownObject,
	channel: MiniBroadcast,
) => {
	const { sourceRequestId, requestId } = payload;
	const { payload: sourcePayload } = getRequestRecord(sourceRequestId);
	return channel.postMessage({
		...sourcePayload,
		from: 'walless@kernel',
		requestId,
		responseCode: ResponseCode.SUCCESS,
	});
};
