import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { ResponseCode } from '@walless/messaging';
import { type PublicKeyDocument, selectors } from '@walless/store';

import { getRequestRecord } from '../utils/requestPool';
import { type HandleMethod } from '../utils/types';

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
