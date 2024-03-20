import type { Networks } from '@walless/core';
import {
	PopupType,
	RequestType,
	ResponseCode,
	ResponseMessage,
} from '@walless/core';
import { utils } from '@walless/network';
import type { ConnectOptions } from '@walless/sdk';
import type { TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';
import { storage } from 'utils/storage/db';

import { closePopup, openPopup } from './popup';
import { getRequestRecord, requestPool, respond } from './requestPool';
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
			const isDuplicatedRequest =
				ele.payload.requestId !== payload.requestId &&
				ele.payload.type === RequestType.REQUEST_CONNECT &&
				ele.payload.options.domain === domain;
			if (isDuplicatedRequest) {
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

export const deserializePayloadToMessageOnTezos: HandleMethod<{
	payload?: string;
	signingType?: string;
}> = ({ payload, next }) => {
	if (payload.from === 'walless@sdk') {
		if (!payload.payload || !payload.signingType)
			throw Error('Missing payload or signingType');

		let message: string;
		try {
			if (payload.signingType === 'raw') {
				message = Buffer.from(payload.payload, 'hex').toString();
				payload.message = message;
			} else if (
				payload.signingType === 'operation' ||
				payload.signingType === 'micheline'
			) {
				message = Buffer.from(payload.payload, 'hex').toString();
				payload.message = message;
			} else {
				throw Error(`can not handle this signing type ${payload.signingType}`);
			}
		} catch (e) {
			console.log('deserialize failed', e);
		}
	}

	next?.(payload);
};
