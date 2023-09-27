import type { ConnectOptions, Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { PopupType, ResponseCode, ResponseMessage } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import type { TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';

import { getPrivateKey } from './handler';
import { closePopup, openPopup } from './popup';
import {
	addRequestRecord,
	getRequestRecord,
	removeRequestRecord,
	requestPool,
	response,
} from './requestPool';
import type { CoordinatingHandle } from './types';

export const handle: CoordinatingHandle = async ({
	channel,
	payload,
	handleMethod,
	requirePrivateKey,
	requireUserAction,
	network,
}) => {
	const { from, type, requestId, sourceRequestId, passcode, isApproved } =
		payload;
	addRequestRecord(requestId, channel, payload);

	if (from == 'walless@sdk' && requireUserAction) {
		const requestSource = getRequestRecord(requestId);
		if (type === RequestType.REQUEST_CONNECT) {
			const { options = {}, requestId = '' } = payload;
			const { onlyIfTrusted, domain } = options as ConnectOptions;

			if (onlyIfTrusted) {
				const domainResponse = await modules.storage.find(
					selectors.trustedDomains,
				);
				const trustedDomains = domainResponse.docs as TrustedDomainDocument[];
				const savedDomain = trustedDomains.find(({ _id }) => _id == domain);
				if (!savedDomain || !savedDomain.connect) {
					Object.values(requestPool).forEach((ele) => {
						if (
							ele.payload.requestId !== requestId &&
							ele.payload.type === RequestType.REQUEST_CONNECT &&
							ele.payload.options.domain === domain
						) {
							try {
								response(ele.payload.requestId, ResponseCode.REJECTED);
								closePopup(ele.payload.popupId);
							} catch (error) {
								console.error(error);
							}
						}
					});

					const { id } = await openPopup(
						PopupType.REQUEST_CONNECT_POPUP,
						requestId,
					);
					requestSource.payload['popupId'] = id;
					return;
				} else if (!savedDomain.trusted) {
					return response(requestId, ResponseCode.REJECTED, {
						message: ResponseMessage.REJECT_REQUEST_CONNECT,
					});
				}
			}
		} else if (type === RequestType.INSTALL_LAYOUT) {
			const { id } = await openPopup(
				PopupType.REQUEST_INSTALL_LAYOUT_POPUP,
				requestId,
			);
			requestSource.payload['popupId'] = id;
		} else if (requirePrivateKey) {
			const { id } = await openPopup(PopupType.SIGNATURE_POPUP, requestId);
			requestSource.payload['popupId'] = id;
		} else {
			return;
		}
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
		// Remove request record from popup that will not be response
		removeRequestRecord(requestId);
	} else if (from === PopupType.REQUEST_INSTALL_LAYOUT_POPUP) {
		/**
		 * Forwarded request
		 * */
		if (!isApproved) {
			response(sourceRequestId, ResponseCode.REJECTED, {
				message: ResponseMessage.REJECT_INSTALL_LAYOUT_REQUEST,
			});

			return removeRequestRecord(requestId);
		}

		// Forward payload from source request to current request
		payload = getRequestRecord(sourceRequestId).payload;
		// Remove request record from popup that will not be response
		removeRequestRecord(requestId);
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
		// Remove request record from popup that will not be response
		removeRequestRecord(requestId);
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
