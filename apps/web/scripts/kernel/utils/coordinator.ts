import { type ConnectOptions, type Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { PopupType, ResponseCode, ResponseMessage } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import { type TrustedDomainDocument, selectors } from '@walless/store';

import { getPrivateKey } from './handler';
import { openPopup } from './popup';
import {
	addRequestRecord,
	getRequestRecord,
	removeRequestRecord,
	response,
} from './requestPool';
import { type Handle } from './types';

export const handle: Handle = async ({
	channel,
	payload,
	handleMethod,
	requirePrivateKey,
	network,
}) => {
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
	} else if (
		from === PopupType.SIGNATURE_POPUP &&
		type !== RequestType.REQUEST_PAYLOAD
	) {
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
		payload,
		responseMethod: response,
	});
};
