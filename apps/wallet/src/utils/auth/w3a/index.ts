import type { GenerateNewShareResult } from '@tkey/common-types';

import { initTkey, storeDeviceShare } from './tkey';

export * from './core';

export const tkey = initTkey();

export const createNewShare = async (
	storeInDevice: boolean = false,
): Promise<GenerateNewShareResult> => {
	const shareResult = await tkey.generateNewShare();

	if (storeInDevice) {
		const share = shareResult.newShareStores[1];
		await storeDeviceShare(tkey, share);
	}

	return shareResult;
};

export enum ThresholdResult {
	Initializing = 'initializing',
	Ready = 'ready',
	Missing = 'missing',
}

export const importAvailableShares = async (): Promise<ThresholdResult> => {
	// try {
	// 	await importDeviceShare(tkey);
	// } catch (e) {
	// 	logger.error('Existing share not available, skip..', e);
	// }

	const { requiredShares, totalShares } = tkey.getKeyDetails();
	const isReady = requiredShares <= 0;

	if (isReady) {
		return totalShares === 2
			? ThresholdResult.Initializing
			: ThresholdResult.Ready;
	}

	return ThresholdResult.Missing;
};
