import type { ConnectOptions } from '@walless/core';
import { modules } from '@walless/ioc';
import { PopupType, ResponseCode, ResponseMessage } from '@walless/messaging';
import { RequestType } from '@walless/messaging';
import type { TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';

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
	requirePrivateKey,
	requireUserAction,
}) => {
	const { from, type, requestId, sourceRequestId, isApproved } = payload;
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
};
