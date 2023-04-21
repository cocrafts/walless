import { injectRuntime } from 'bridge/entry';
import { initializeExtensionState } from 'state/extension';
import { initializeWalletState } from 'state/wallet';
import { initializeStorage } from 'utils/pouchdb';

export const initializeServices = async () => {
	await Promise.all([
		injectRuntime(),
		initializeStorage(),
		initializeWalletState(),
		initializeExtensionState(),
	]);
};
