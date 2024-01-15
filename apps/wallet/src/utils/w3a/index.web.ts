import WebStorageModule from '@tkey/web-storage';
import { logger } from '@walless/core';
import { ThresholdResult } from 'utils/auth';

import { modules, thresholdKey } from './index.ext';

modules.webStorage = new WebStorageModule();

export const importAvailableShares = async (): Promise<ThresholdResult> => {
	try {
		await thresholdKey.modules.webStorage?.inputShareFromWebStorage();
		const { requiredShares, totalShares } = thresholdKey.getKeyDetails();
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
	recoverDeviceShareFromPasscode,
	thresholdKey,
} from './index.ext';
