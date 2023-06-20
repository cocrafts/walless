import { modules } from '@walless/ioc';
import { ResponseCode } from '@walless/messaging';
import { type PublicKeyDocument, selectors } from '@walless/store';

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
