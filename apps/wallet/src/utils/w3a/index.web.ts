import WebStorageModule from '@tkey/web-storage';
import { ThresholdResult } from '@walless/auth';
import { logger } from '@walless/core';

import { key, modules } from './index.ext';

modules.webStorage = new WebStorageModule();

export const importAvailableShares = async (): Promise<ThresholdResult> => {
	try {
		await key.modules.webStorage?.inputShareFromWebStorage();
		const { requiredShares, totalShares } = key.getKeyDetails();
		const isReady = requiredShares <= 0;

		if (isReady) {
			return totalShares === 2
				? ThresholdResult.Initializing
				: ThresholdResult.Ready;
		}
	} catch (e) {
		logger.info('Existing share not available, skip..');
	}

	return ThresholdResult.Missing;
};

export type {
	InternalModules,
	SeedPhraseFormatType,
	TypedThresholdKey,
} from './index.ext';
export {
	configureSecurityQuestionShare,
	customAuth,
	customAuthArgs,
	getGoogleAuthURL,
	key,
	recoverDeviceShareFromPasscode,
} from './index.ext';
