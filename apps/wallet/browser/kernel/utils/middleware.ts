import type { ConnectOptions, Networks } from '@walless/core';
import { utils } from '@walless/kernel';
import {
	PopupType,
	RequestType,
	ResponseCode,
	ResponseMessage,
} from '@walless/messaging';
import type { TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';

import { closePopup, openPopup } from './popup';
import { getRequestRecord, requestPool, respond } from './requestPool';
import { storage } from './storage';
import type { HandleMethod } from './types';

export const getPrivateKey = (
	network: Networks,
): HandleMethod<{ passcode?: string }> => {
	return async ({ payload, next }) => {
		const passcode = payload.passcode;
		if (!passcode) {
			return respond(payload.requestId, ResponseCode.REQUIRE_PASSCODE);
		}

		try {
			const privateKey = await utils.getPrivateKey(network, passcode);
			next?.({ ...payload, privateKey });
		} catch {
			respond(payload.requestId, ResponseCode.WRONG_PASSCODE);
		}
	};
};

export const checkConnection: HandleMethod<{
	options?: ConnectOptions;
}> = async ({ payload, next }) => {
	if (!payload.options) throw Error('No connection options provided');
	const { onlyIfTrusted, domain } = payload.options;

	if (!onlyIfTrusted) {
		next?.(payload);
		return;
	}

	const domainResponse = await storage.find(selectors.trustedDomains);
	const trustedDomains = domainResponse.docs as TrustedDomainDocument[];
	const savedDomain = trustedDomains.find(({ _id }) => _id == domain);
	if (!savedDomain || !savedDomain.connect) {
		Object.values(requestPool).forEach((ele) => {
			if (
				ele.payload.requestId !== payload.requestId &&
				ele.payload.type === RequestType.REQUEST_CONNECT &&
				ele.payload.options.domain === domain
			) {
				respond(ele.payload.requestId, ResponseCode.ERROR);
				closePopup(ele.payload.popupId);
			}
		});

		await openPopup(PopupType.REQUEST_CONNECT_POPUP, payload.requestId);
	} else if (!savedDomain.trusted) {
		return respond(payload.requestId, ResponseCode.ERROR, {
			error: ResponseMessage.REJECT_REQUEST_CONNECT,
		});
	} else {
		next?.(payload);
	}
};

export const checkApproval: HandleMethod<{
	isApproved?: boolean;
}> = async ({ payload, next }) => {
	const { requestId, sourceRequestId, isApproved } = payload;

	if (!isApproved) {
		respond(sourceRequestId, ResponseCode.ERROR, {
			message: ResponseMessage.REJECT_REQUEST_CONNECT,
		});
	} else {
		payload = getRequestRecord(sourceRequestId).payload;
		await next?.(payload);
	}

	respond(requestId, ResponseCode.SUCCESS);
};

export const filterSDKSignatureRequest: HandleMethod<{
	isApproved?: boolean;
}> = async ({ payload, next }) => {
	const { from, requestId, isApproved, sourceRequestId } = payload;

	if (from === 'walless@sdk') {
		await openPopup(PopupType.SIGNATURE_POPUP, requestId);
	} else if (from === PopupType.SIGNATURE_POPUP) {
		if (!sourceRequestId) throw Error('No source request id provided');
		if (!isApproved) {
			respond(sourceRequestId, ResponseCode.ERROR, {
				error: 'User rejected the request',
			});
			respond(requestId, ResponseCode.SUCCESS);
		} else {
			await next?.(payload);
		}
	} else {
		await next?.(payload);
	}
};

export const forwardToSourceRequest: HandleMethod<{
	sourceRequestId?: string;
}> = async ({ payload, next }) => {
	const { sourceRequestId } = payload;
	if (sourceRequestId) {
		const sourcePayload = getRequestRecord(sourceRequestId as string).payload;
		if (!sourcePayload) throw Error('No source payload found');
		await next?.({ ...payload, ...sourcePayload });
		respond(payload.requestId, ResponseCode.SUCCESS);
	} else {
		next?.(payload);
	}
};
