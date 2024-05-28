import type { ChromeKernel } from '@metacraft/crab/chrome';
import type { Middleware, RawRequest } from '@metacraft/crab/core';
import type { RequestType } from '@walless/core';
import type { Networks } from '@walless/core';
import {
	PopupType,
	ResponseCode,
	ResponseMessage,
	Timeout,
} from '@walless/core';
import type { Channels } from '@walless/messaging';
import { utils } from '@walless/network';
import type { TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { storage } from 'utils/storage/db';

import { openPopup } from './popup';
import { getRequestRecord, respond } from './requestPool';
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
			const privateKey = await utils.getPrivateKey(storage, network, passcode);
			next?.({ ...payload, privateKey });
		} catch {
			respond(payload.requestId, ResponseCode.WRONG_PASSCODE);
		}
	};
};

export const checkConnection = (
	kernel: ChromeKernel<Channels, RequestType>,
): Middleware => {
	return async (payload, respond, next) => {
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
			const { isApproved } = await handleUserAction<{ isApproved: boolean }>({
				kernel,
				payload,
				popupType: PopupType.REQUEST_CONNECT_POPUP,
			});

			if (isApproved) {
				next?.(payload);
			} else {
				respond({
					requestId: payload.id,
					error: ResponseMessage.REJECT_REQUEST_CONNECT,
					responseCode: ResponseCode.ERROR,
				});
			}
		} else if (!savedDomain.trusted) {
			respond({
				requestId: payload.id,
				error: ResponseMessage.REJECT_REQUEST_CONNECT,
				responseCode: ResponseCode.ERROR,
			});
		} else {
			next?.(payload);
		}
	};
};

const handleUserAction = async <T extends object>({
	kernel,
	payload,
	popupType,
}: {
	kernel: ChromeKernel<Channels, RequestType>;
	payload: any;
	popupType: PopupType;
}) => {
	const { resolveId, resolve } = kernel.createCrossResolvingRequest(
		payload.requestId,
		payload.timeout || Timeout.sixtySeconds,
	);

	openPopup(popupType, resolveId);

	return await resolve<RawRequest<RequestType, T>>();
};

// export const checkApproval = (
// 	kernel: ChromeKernel<Channels, RequestType>,
// ): Middleware => {
// 	return async (payload, respond) => {
// 		const { resolveId, isApproved } = payload;

// 		if (!isApproved) {
// 			kernel.handleCrossResolvingMiddleware(payload);
// 			respond(sourceRequestId, ResponseCode.ERROR, {
// 				message: ResponseMessage.REJECT_REQUEST_CONNECT,
// 			});
// 		} else {
// 			payload = getRequestRecord(sourceRequestId).payload;
// 			await next?.(payload);
// 		}

// 		respond(requestId, ResponseCode.SUCCESS);
// 	};
// };

export const requestUserPermission = (
	kernel: ChromeKernel<Channels, RequestType>,
): Middleware => {
	return async (payload, respond, next) => {
		if (!payload.options) throw Error('No connection options provided');

		const { passcode, isApproved } = await handleUserAction<{
			passcode: string;
			isApproved: boolean;
		}>({
			kernel,
			payload,
			popupType: PopupType.SIGNATURE_POPUP,
		});

		if (isApproved) {
			next?.({ ...payload, passcode });
		} else {
			respond({
				requestId: payload.id,
				error: ResponseMessage.REJECT_COMMON_REQUEST,
				responseCode: ResponseCode.ERROR,
			});
		}
	};
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
