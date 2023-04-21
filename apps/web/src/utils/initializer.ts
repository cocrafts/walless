import { injectRuntime } from 'bridge/entry';
import { initializeStateSync } from 'state/live';
import { initializeWalletState } from 'state/wallet';
import { initializeStorage } from 'utils/pouch';

export const initializeServices = async () => {
	await Promise.all([
		injectRuntime(),
		initializeStorage(),
		initializeWalletState(),
		initializeStateSync(),
	]);
};
