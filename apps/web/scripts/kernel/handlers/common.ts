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
import { getRequestRecord } from '../utils/requestPool';
import type { HandleMethod, InstallLayoutPayload } from '../utils/types';

export const handleConnect: HandleMethod = async ({
	payload,
	responseMethod,
}) => {
	const connectOptions = payload.options as ConnectOptions;

	if (connectOptions.domain) {
		const doc = {
			_id: connectOptions.domain,
			type: 'TrustedDomain',
			trusted: true,
			connectCount: 1,
			connect: true,
		};
		await modules.storage.upsert<TrustedDomainDocument>(
			doc._id,
			async (prevDoc) => {
				if (prevDoc.connectCount) {
					doc.connectCount = prevDoc.connectCount + 1;
				}

				return doc as TrustedDomainDocument;
			},
		);
	}

	const publicKeys = await modules.storage.find(selectors.allKeys);
	const solKey = (publicKeys.docs as PublicKeyDocument[]).find(
		(key) => key.network == Networks.solana,
	);

	responseMethod(payload.requestId, ResponseCode.SUCCESS, {
		publicKeys: [solKey],
	});
};

export const handleDisconnect: HandleMethod = async ({
	payload,
	responseMethod,
}) => {
	const connectOptions = payload.options as ConnectOptions;
	console.log('disconnect request');

	if (connectOptions.domain) {
		await modules.storage.upsert<TrustedDomainDocument>(
			connectOptions.domain,
			async (doc) => {
				doc.connect = false;
				return doc as TrustedDomainDocument;
			},
		);
	}

	responseMethod(payload.requestId, ResponseCode.SUCCESS);
};

export const handleRequestPayload: HandleMethod = ({
	payload,
	responseMethod,
}) => {
	const { sourceRequestId, requestId } = payload;
	const { payload: sourcePayload, channel: sourceChannel } =
		getRequestRecord(sourceRequestId);

	responseMethod(requestId, ResponseCode.SUCCESS, {
		...sourceChannel,
		...sourcePayload,
	});
};

export const handleInstallLayout: HandleMethod = async ({
	payload,
	responseMethod,
}) => {
	const { requestId, id } = payload as InstallLayoutPayload;
	try {
		await addExtensionsById(id);
		responseMethod(requestId, ResponseCode.SUCCESS);
	} catch (error) {
		responseMethod(requestId, ResponseCode.ERROR);
		throw Error(error as string);
	}
};

export const handleCheckInstalledLayout: HandleMethod = async ({
	payload,
	responseMethod,
}) => {
	const { requestId, id } = payload as InstallLayoutPayload;
	const isInstalled = await checkInstalledExtensionById(id);

	if (isInstalled) {
		responseMethod(requestId, ResponseCode.SUCCESS);
	} else {
		responseMethod(requestId, ResponseCode.ERROR);
	}
};

export const handleOpenLayoutPopup: HandleMethod = async ({
	payload,
	responseMethod,
}) => {
	const { requestId, id: layoutId } = payload;
	const popup = await openPopup(layoutId, requestId);

	if (popup) {
		responseMethod(requestId, ResponseCode.SUCCESS);
	} else {
		responseMethod(requestId, ResponseCode.ERROR);
	}
};
