import type { ConnectOptions } from '@walless/core';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { ResponseCode } from '@walless/messaging';
import type { PublicKeyDocument, TrustedDomainDocument } from '@walless/store';
import { selectors } from '@walless/store';

import {
	addExtensionsById,
	checkInstalledExtensionById,
} from '../utils/helper';
import { openPopup } from '../utils/popup';
import { getRequestRecord, respond } from '../utils/requestPool';
import type { HandleMethod } from '../utils/types';

export const connect: HandleMethod<{ options?: ConnectOptions }> = async ({
	payload,
}) => {
	if (!payload.options) throw new Error('No connection options provided');

	const { domain, network = Networks.solana } = payload.options;
	if (domain) {
		const doc = {
			_id: domain,
			type: 'TrustedDomain',
			trusted: true,
			connectCount: 1,
			connect: true,
			network,
		};
		await modules.storage.upsert<TrustedDomainDocument>(
			doc._id,
			async (prevDoc) => {
				if (prevDoc.connectCount) {
					doc.connectCount = prevDoc.connectCount + 1;
				}

				if (!prevDoc.network) {
					doc.network = network;
				}

				return doc as TrustedDomainDocument;
			},
		);
	}

	const publicKeys = await modules.storage.find(selectors.allKeys);
	const publicKey = (publicKeys.docs as PublicKeyDocument[]).find(
		(key) => key.network == network,
	);

	respond(payload.requestId, ResponseCode.SUCCESS, { publicKeys: [publicKey] });
};

export const disconnect: HandleMethod<{
	options?: ConnectOptions;
}> = async ({ payload }) => {
	if (!payload.options) throw Error('No disconnection options provided');

	const connectOptions = payload.options;
	if (connectOptions.domain) {
		await modules.storage.upsert<TrustedDomainDocument>(
			connectOptions.domain,
			async (doc) => {
				doc.connect = false;
				return doc as TrustedDomainDocument;
			},
		);
	}

	respond(payload.requestId, ResponseCode.SUCCESS);
};

export const requestPayload: HandleMethod<{
	sourceRequestId?: string;
}> = ({ payload }) => {
	if (!payload.sourceRequestId) {
		throw Error('Not sourceRequestId provided');
	}

	const { sourceRequestId, requestId } = payload;
	const { payload: sourcePayload, channel: sourceChannel } =
		getRequestRecord(sourceRequestId);

	respond(requestId, ResponseCode.SUCCESS, {
		...sourceChannel,
		...sourcePayload,
	});
};

export type LayoutPayload = {
	id?: string;
};

export const installLayout: HandleMethod<LayoutPayload> = async ({
	payload,
}) => {
	const { requestId, id } = payload;
	if (!id) throw Error('No layout id provided');

	await addExtensionsById(id);
	respond(requestId, ResponseCode.SUCCESS);
};

export const checkInstalledLayout: HandleMethod<LayoutPayload> = async ({
	payload,
}) => {
	const { requestId, id } = payload;
	if (!id) throw Error('No layout id provided');

	const isInstalled = await checkInstalledExtensionById(id);
	if (!isInstalled) throw Error('Layout not installed');

	respond(requestId, ResponseCode.SUCCESS);
};

export const openLayoutPopup: HandleMethod<LayoutPayload> = async ({
	payload,
}) => {
	const { requestId, id: layoutId } = payload;
	if (!layoutId) throw Error('No layout id provided');

	const popup = await openPopup(layoutId, requestId);
	if (!popup) throw Error('Cannot open popup');

	respond(requestId, ResponseCode.SUCCESS);
};
