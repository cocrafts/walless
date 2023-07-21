import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { ResponseCode } from '@walless/messaging';
import type { PublicKeyDocument } from '@walless/store';
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
	const publicKeys = await modules.storage.find(selectors.allKeys);
	const solKey = (publicKeys.docs as PublicKeyDocument[]).find(
		(key) => key.network == Networks.solana,
	);

	responseMethod(payload.requestId, ResponseCode.SUCCESS, {
		publicKeys: [solKey],
	});
};

export const handleRequestPayload: HandleMethod = ({
	payload,
	responseMethod,
}) => {
	const { sourceRequestId, requestId } = payload;
	const { payload: sourcePayload } = getRequestRecord(sourceRequestId);

	responseMethod(requestId, ResponseCode.SUCCESS, sourcePayload);
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
